import { AbstractControl , ValidationErrors} from "@angular/forms";

export function PasswordValidator(control: AbstractControl):{[key:string]:boolean} | null
{
   const password = control.get('password')
   const confirmPassword = control.get('confirmPassword');
   if(0<password.value.length && password.value.length < 6)
   {
    return {'toShort':true};
   }
   if(password.pristine || confirmPassword.pristine)
   {
     return null;
   }
   return password && confirmPassword && password.value != confirmPassword.value ?
   {'misMatch':true} : null
}

export function noEmptyValue(control: AbstractControl):ValidationErrors | null
{
   if(control.value == undefined)
   {
    return {noEmptyValue:true}
   }
   return null;
}