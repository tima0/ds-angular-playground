import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface IGroup {
    id: number;
    groupName: string;
    groupId: number;
    status: string;
    subs: number;
    effective: string;
    renewal: string;
    termDate: string;
    address: string;
    city: string;
    state: IState;
    latitude?: number;
    longitude?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}
