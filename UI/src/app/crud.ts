import { Observable } from 'rxjs';

export interface Crud<T> {

    // as we follow the observer pattern
    // we wanna keep an eye on every change that happens
    // eg.
    // T : can be User, when rendering the (logged in) user data (eg. name at the top )
    // T : can be Post[], when rendering a bunch of posts

    create(t: any): Observable<T>;
    read(id: string): Observable<T>;
    update(t: any): Observable<T>;
    delete(id: string): Observable<T>;





}
