import { Type } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, UrlSegment, Params, Data, Route, ParamMap } from '@angular/router';

import { Observable, of } from 'rxjs';

import { IGroup, IPagedResults } from './interfaces';

export class MockDataService {
    constructor() {}

    getGroup(id: number): Observable<IGroup> {
        if (id === 1) {
            return of(groups.slice(0, 1)[0]);
        } else {
            return of(null);
        }
    }

    getGroupsPage(page: number, pageSize: number): Observable<IPagedResults<IGroup[]>> {
        const topVal = pageSize,
            skipVal = page,
            skip = (isNaN(skipVal)) ? 0 : +skipVal;
        let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

        if (top > groups.length) {
            top = skip + (groups.length - skip);
        }

        return of({
            totalRecords: groups.length,
            results: groups.slice(skip, top)
        });
    }

    getGroups(): Observable<IGroup[]> {
        return of(groups);
    }
}

export class MockActivatedRoute implements ActivatedRoute {
    snapshot: ActivatedRouteSnapshot;
    url: Observable<UrlSegment[]>;
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    data: Observable<Data>;
    outlet: string;
    component: Type<any> | string;
    routeConfig: Route;
    root: ActivatedRoute;
    parent: ActivatedRoute;
    firstChild: ActivatedRoute;
    children: ActivatedRoute[];
    pathFromRoot: ActivatedRoute[];
    paramMap: Observable<ParamMap>;
    queryParamMap: Observable<ParamMap>;
    toString(): string {
        return '';
    }
}

export function getActivatedRouteWithParent(params: any[]) {
    const route = new MockActivatedRoute();
    route.parent = new MockActivatedRoute();
    if (params) {
        for (const param of params) {
            // var keyNames = Object.keys(param);
            route.parent.params = of(param);
        }
    }

    return route;
}

export const groups = [
    {
        'id': 1,
        'groupName': 'Rocky MH',
        'groupId': 10599432,
        'status': 'Active',
        'effective': '01/01/2015',
        'renewal': '01/01/2019',
        'termDate': '',
        'address': '1234 Anywhere St.',
        'city': ' Sandy ',
        'state': {
            'abbreviation': 'UT',
            'name': 'Utah'
        },
        'latitude': 40.5650,
        'longitude': -111.8390
    },
    {
      'id': 2,
      'groupName': 'Select Benefits Group',
      'groupId': 10345512,
      'status': 'Active',
      'effective': '07/01/1989',
      'renewal': '01/01/2019',
      'termDate': '',
      'address': '75 W Towne Ridge Pkwy tower 2 suite 500',
      'city': ' Sandy ',
      'state': {
          'abbreviation': 'UT',
          'name': 'Utah'
      },
      'latitude': 40.55754,
      'longitude': -111.8324
  },
  {
    'id': 3,
    'groupName': 'Harmony',
    'groupId': 1066758,
    'status': 'Active',
    'effective': '01/01/2016',
    'renewal': '01/01/2019',
    'termDate': '',
    'address': '1750 W Traverse Pkwy',
    'city': ' Lehi ',
    'state': {
        'abbreviation': 'UT',
        'name': 'Utah'
    },
    'latitude': 40.4333,
    'longitude': -111.8784
}
];
