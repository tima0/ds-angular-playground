import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IGroup, IState, IPagedResults, IApiResponse } from '../../shared/interfaces';

@Injectable()
export class DataService {

    groupsBaseUrl = '/api/groups';
    states: IState[];

    constructor(private http: HttpClient) { }

    getGroupsPage(page: number, pageSize: number): Observable<IPagedResults<IGroup[]>> {
        return this.http.get<IGroup[]>(
            `${this.groupsBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const groups = res.body as IGroup[];
                    return {
                        results: groups,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getGroups(): Observable<IGroup[]> {
        return this.http.get<IGroup[]>(this.groupsBaseUrl)
            .pipe(
                map(groups => {
                    return groups;
                }),
                catchError(this.handleError)
            );
    }

    getGroup(id: number): Observable<IGroup> {
        return this.http.get<IGroup>(this.groupsBaseUrl + '/' + id)
            .pipe(
                map(group => {
                    return group;
                }),
                catchError(this.handleError)
            );
    }

    insertGroup(group: IGroup): Observable<IGroup> {
        return this.http.post<IGroup>(this.groupsBaseUrl, group)
            .pipe(catchError(this.handleError));
    }

    updateGroup(group: IGroup): Observable<boolean> {
        return this.http.put<IApiResponse>(this.groupsBaseUrl + '/' + group.id, group)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteGroup(id: number): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.groupsBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>('/api/states')
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }



    // Not using now but leaving since they show how to create
    // and work with custom observables

    // Would need following import added:
    // import { Observer } from 'rxjs';

    // createObservable(data: any): Observable<any> {
    //     return Observable.create((observer: Observer<any>) => {
    //         observer.next(data);
    //         observer.complete();
    //     });
    // }

}
