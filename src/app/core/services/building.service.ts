import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api-service';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private baseApi: WebApiService) {}
  getBuildings(): Observable<any[]> {
    return this.baseApi.get('api/Building/GetBuildings');
  }
  getObjects(): Observable<any[]> {
    return this.baseApi.get('api/Building/GetObjects');
  }
  getDataFields(): Observable<any[]> {
    return this.baseApi.get('api/Building/GetDataFields');
  }
  getReadings(
    BuildingId: number,
    ObjectId: number,
    DataFieldId: number,
    startTime: any,
    endTime: any,
  ): Observable<ChartMdoel[]> {
    return this.baseApi.get(
      `api/Building/GetReadings/${BuildingId}/${ObjectId}/${DataFieldId}/${startTime}/${endTime}`,
    );
  }
}


export interface ChartMdoel {
	id: number;
	buildingId: number;
	building?: any;
	objectId: number;
	object?: any;
	dataFieldId: number;
	dataField?: any;
	value: number;
	timestamp: string;
}
