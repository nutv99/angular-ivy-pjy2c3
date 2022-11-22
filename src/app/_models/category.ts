
export interface full_categoryModel {
  id? : number ;
  categorycode? : string ;
  lang? : string ;
  categoryDesc? : string ;
  imageName? : string ;
  grandParentCode? : string ;
  departmentID? : number ;
  TotalProduct? : number ;
  isDelete? : string ;
  createdAt? : Date ;
  updatedby? : string ;
  lastupdate? : Date ;
}
export interface crud_categoryModel {
  id? : number ;
  categorycode? : string ;
  lang? : string ;
  categoryDesc? : string ;
  imageName? : string ;
  grandParentCode? : string ;
  departmentID? : number ;
  TotalProduct? : number ;
}
export interface form_categoryModel {
  lang? : string ;
  categoryDesc? : string ;
  imageName? : string ;
}
export interface post_categoryModel {
  id? : number ;
  categorycode? : string ;
  lang? : string ;
  categoryDesc? : string ;
  imageName? : string ;
  grandParentCode? : string ;
  departmentID? : number ;
  TotalProduct? : number ;
}
export interface put_categoryModel {
  id? : number ;
  categorycode? : string ;
  lang? : string ;
  categoryDesc? : string ;
  imageName? : string ;
  grandParentCode? : string ;
  departmentID? : number ;
  TotalProduct? : number ;
}