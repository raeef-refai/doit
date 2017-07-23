import {
  OnInit,
  NgZone,
  Component,
} from '@angular/core';
import {
  LatLngLiteral,
  MouseEvent as MapMouseEvent,
} from '@agm/core';
import {
  BackendService,
} from '../shared/backend.service';
import {
  AccountService,
} from '../auth/account.service';
import {
  Observable,
} from 'rxjs/Observable';
import {
  HttpParams,
} from '@angular/common/http';
import 'rxjs/add/observable/merge';
import * as _ from 'lodash';

declare const google: any;

interface IMarker {
  id?: string;
  location: LatLngLiteral;
  accountId?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
  ],
})
export class HomeComponent implements OnInit {

  isLoading = false;
  mapCenter: LatLngLiteral;
  mapMarkers: IMarker[];
  userMarkers: IMarker[];
  currentType: string;
  markersToSave: IMarker[] = [];
  markersToDelete: IMarker[] = [];
  types = [{
    name: 'gas_station',
    title: 'Gas Stations',
  }, {
    name: 'pharmacy',
    title: 'Pharmacies',
  }, {
    name: 'restaurant',
    title: 'Restaurants',
  }, {
    name: 'school',
    title: 'Schools',
  }];

  private _map: any;
  private _placesService: any;

  constructor(
    private _zone: NgZone,
    private _account: AccountService,
    private _backend: BackendService,
  ) {
    this._backend.listRel('account', this._account.account.id, 'marker')
      .subscribe((markers: IMarker[]) => this.userMarkers = this.mapMarkers = markers);
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          this._setMapCenter(response.coords.latitude, response.coords.longitude);
        }, () => {
          this._setMapCenter();
        }, {
          enableHighAccuracy: true,
        }
      );
    } else {
      this._setMapCenter();
    }
  }

  mapReadyHandler(map: any) {
    this._map = map;

    this._placesService = new google.maps.places.PlacesService(map);
  }

  mapClickHandler(event: MapMouseEvent) {
    if (this.userMarkers === this.mapMarkers && !this.isLoading) {
      const marker = {
        location: event.coords,
      };

      this.markersToSave.push(marker);

      this.userMarkers.push(marker);
    }
  }

  markerClickHandler(marker: IMarker, index: number) {
    if (this.userMarkers === this.mapMarkers) {
      if (marker.id) {
        this.markersToDelete.push(marker);
      } else {
        this.markersToSave = _.without(this.markersToSave, marker);
      }

      this.userMarkers.splice(index, 1);
    }
  }

  getPlaces(type: string) {
    this.isLoading = true;

    this.currentType = type;

    const center = this._map.center;

    this._placesService.nearbySearch({
      location: {
        lat: center.lat(),
        lng: center.lng(),
      },
      radius: this._getRadius(center.lat(), this._map.zoom),
      type: [
        type,
      ],
    }, (res: any[]) => {
      this._zone.run(() => {
        this.mapMarkers = res.map((place: any) => {
          return {
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
          };
        });

        this.isLoading = false;
      });
    });
  }

  idleHandler() {
    if (this.userMarkers !== this.mapMarkers) {
      this.getPlaces(this.currentType);
    }
  }

  showUserMarkers() {
    this.mapMarkers = this.userMarkers;

    this.currentType = null;
  }

  updateMarkers() {
    const observables: Observable<any>[] = [];

    if (this.markersToSave.length) {
      observables.push(this._backend.createRel('account', this._account.account.id, 'marker', this.markersToSave));
    }

    if (this.markersToDelete.length) {
      const params = new HttpParams()
        .set('ids', JSON.stringify(this.markersToDelete.map(marker => marker.id)));

      observables.push(this._backend.deleteRel('account', this._account.account.id, 'marker', params));
    }

    if (observables.length) {
      this.isLoading = true;

      Observable.merge(...observables).subscribe((markers: IMarker[]) => {
        if (markers) {
          this.markersToSave.forEach((marker, index) => marker.id = markers[index].id);

          this.markersToSave = [];
          this.markersToDelete = [];
        }
      }, null, () => {
        this.isLoading = false;
      });
    }
  }

  private _setMapCenter(lat = 46.4601261, lng = 30.5717038): void {
    this.mapCenter = {
      lat,
      lng,
    };
  }

  private _getRadius(lat: number, zoom: number) {
    return 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom) * 250;
  }

}
