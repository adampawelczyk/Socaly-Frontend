import { EventEmitter, Injectable, Output } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { SignupModel } from "../signup/signup.model"
import { Observable, throwError } from "rxjs"
import { LoginRequestModel } from "../login/login-request.model"
import { LoginResponseModel } from "../login/login-response.model"
import { map, tap } from "rxjs/operators"
import { LocalStorageService } from "ngx-webstorage"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter()
  @Output() username: EventEmitter<string> = new EventEmitter()

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupModel): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/auth/signup', signupRequestPayload, {responseType: 'text'})
  }

  login(loginRequestPayload: LoginRequestModel): Observable<boolean> {
    return this.httpClient.post<LoginResponseModel>('http://localhost:8090/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken)
        this.localStorage.store('username', data.username)
        this.localStorage.store('refreshToken', data.refreshToken)
        this.localStorage.store('expiresAt', data.expiresAt)

        this.loggedIn.emit(true)
        this.username.emit(data.username)

        return true
      }))
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken')
  }

  refreshToken() {
    return this.httpClient.post<LoginResponseModel>('http://localhost:8090/api/auth/refresh/token', this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken')
        this.localStorage.clear('expiresAt')

        this.localStorage.store('authenticationToken', response.authenticationToken)
        this.localStorage.store('expiresAt', response.expiresAt)
      }))
  }

  logout() {
    this.httpClient.post('http://localhost:8090/api/auth/logout', this.refreshTokenPayload, {responseType: 'text'})
      .subscribe(data => {
        console.log(data)
      }, error => {
        throwError(error)
      })

    this.localStorage.clear('authenticationToken')
    this.localStorage.clear('username')
    this.localStorage.clear('refreshToken')
    this.localStorage.clear('expiresAt')
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken')
  }

  getUsername() {
    return this.localStorage.retrieve('username')
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null
  }
}
