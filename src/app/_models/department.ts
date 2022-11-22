export interface DepartmentModel {
  id: number;
  departmentCode: string;
  departmentDesc: string;
  lang: string;
  ImageName: string;
}

export interface full_departmentModel {
  id? : number ;
  shopID? : number ;
  departmentCode? : string ;
  code2? : string ;
  departmentDesc? : string ;
  lang? : string ;
  imageName? : string ;
  faIcon? : string ;
  createdAt? : Date ;
  isDelete? : string ;
  updatedby? : string ;
  lastupdate? : Date ;
}
export interface crud_departmentModel {
  id? : number ;
  departmentCode? : string ;
  code2? : string ;
  departmentDesc? : string ;
}
export interface form_departmentModel {
  id? : number ;
  shopID? : number ;
  departmentCode? : string ;
  code2? : string ;
  departmentDesc? : string ;
  lang? : string ;
  imageName? : string ;
  faIcon? : string ;
}
export interface post_departmentModel {
  id? : number ;
  shopID? : number ;
  departmentCode? : string ;
  code2? : string ;
  departmentDesc? : string ;
  lang? : string ;
  imageName? : string ;
  faIcon? : string ;
}
export interface put_departmentModel {
  id? : number ;
  shopID? : number ;
  departmentCode? : string ;
  code2? : string ;
  departmentDesc? : string ;
  lang? : string ;
  imageName? : string ;
  faIcon? : string ;
}