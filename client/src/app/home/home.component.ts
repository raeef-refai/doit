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

declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
  ],
})
export class HomeComponent implements OnInit {

  mapCenter: LatLngLiteral;
  mapMarkers: LatLngLiteral[];
  userMarkers: LatLngLiteral[];
  currentType: string;
  isMarkerClickable = true;
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
    private _backend: BackendService,
  ) {
    this.userMarkers = this.mapMarkers = [];
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
    if (this.userMarkers === this.mapMarkers) {
      this.userMarkers.push(event.coords);
    }
  }

  markerClickHandler(marker: LatLngLiteral) {
    if (this.userMarkers === this.mapMarkers) {
      this.userMarkers.splice(this.userMarkers.indexOf(marker), 1);
    }
  }

  getPlaces(type: string) {
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
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
        });
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
