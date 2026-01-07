import axios from 'axios';
import { T_adminGetUserApplicationsList } from "./api/adminGetUserApplicationsList";
import { T_adminGetApplicationById } from "./api/adminGetApplicationById";
import { T_adminVerifyApplicationById } from "./api/adminVerifyApplicationById";
import { T_loginAdmin } from "./api/loginAdmin";
import { T_registerAdmin } from "./api/registerAdmin";
import { T_adminVerifyPayment } from "./api/adminVerifyPayment";
import { T_userGetUserApplicantsList } from "./api/userGetUserApplicantsList";
import { T_userCreateUserApplicant } from "./api/userCreateUserApplicant";
import { T_userUpdateUserApplicantById } from "./api/userUpdateUserApplicantById";
import { T_userDeleteUserApplicantById } from "./api/userDeleteUserApplicantById";
import { T_userGetUserApplicationsList } from "./api/userGetUserApplicationsList";
import { T_userGetUserApplicationById } from "./api/userGetUserApplicationById";
import { T_userCreateApplication } from "./api/userCreateApplication";
import { T_userUpdateUserApplicationById } from "./api/userUpdateUserApplicationById";
import { T_userDeleteUserApplicationById } from "./api/userDeleteUserApplicationById";
import { T_registerNewUser } from "./api/registerNewUser";
import { T_loginUser } from "./api/loginUser";
import { T_verifyEmailRegistration } from "./api/verifyEmailRegistration";
import { T_getProfile } from "./api/getProfile";
import { T_userMakePayment } from "./api/userMakePayment";

export namespace AxiosClient {

  function __build_path(base_url: string, url_path: string, path_param: { [key: string]: any }) {
    const build_path = url_path.replace(/:([a-zA-Z_]\w*)/g, (_, key) => {
      if (path_param[key] === undefined) {
        throw new Error(`Missing param: ${key}`);
      }
      return encodeURIComponent(String(path_param[key]));
    });
    const url = new URL((base_url.endsWith('/') ? base_url : base_url + '/') + build_path.replace(/^\/+/, ''));
    return url.toString();
  }
  export class BaseURL {
    public base_url: string = '';
    static _instance: BaseURL | undefined;
    public static get instance(): BaseURL {
      if (!BaseURL._instance) {
        BaseURL._instance = new BaseURL();
      }
      return BaseURL._instance;
    }
    private constructor(){}
    public set(_base_url: string) {
      this.base_url = _base_url;
    }
  }

  export const adminGetUserApplicationsList: T_adminGetUserApplicationsList = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/applications', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const adminGetApplicationById: T_adminGetApplicationById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/application/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminVerifyApplicationById: T_adminVerifyApplicationById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/application/:id_application', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const loginAdmin: T_loginAdmin = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/login', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const registerAdmin: T_registerAdmin = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/register', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const adminVerifyPayment: T_adminVerifyPayment = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/application/payment/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const userGetUserApplicantsList: T_userGetUserApplicantsList = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/applicants', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const userCreateUserApplicant: T_userCreateUserApplicant = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/applicant', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const userUpdateUserApplicantById: T_userUpdateUserApplicantById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/applicant/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const userDeleteUserApplicantById: T_userDeleteUserApplicantById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/applicant/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const userGetUserApplicationsList: T_userGetUserApplicationsList = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/applications', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const userGetUserApplicationById: T_userGetUserApplicationById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/application/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const userCreateApplication: T_userCreateApplication = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/application', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const userUpdateUserApplicationById: T_userUpdateUserApplicationById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/application/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const userDeleteUserApplicationById: T_userDeleteUserApplicationById = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/application/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const registerNewUser: T_registerNewUser = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/register', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const loginUser: T_loginUser = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/login', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const verifyEmailRegistration: T_verifyEmailRegistration = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/verify-registration-email', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const getProfile: T_getProfile = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/profile', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const userMakePayment: T_userMakePayment = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/user/application/payment/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
}