export class CurrentUser {
 [x: string]: any;
 constructor(
  public userId: number,
  public firstName: string,
  public lastName: string,
  public emailAddress: string,
  public mobileNumber: string,
  public dateOfBirth: string,
  public gender: string,
  public joiningDate: Date,
  public profilePic: string,
  private role: string,
  ){}

  public getRole(){
   return this.role;
  }

}