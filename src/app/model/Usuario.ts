export class Usuario {
    public nombreUsuario = '';
    public password = '';
  
    public validarNombreUsuario(): string {
      if (this.nombreUsuario.trim() === '') {
        return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
      }
      if(this.nombreUsuario.trim() !== 'Jorge12'){
        return 'Usuario incorrecto.';
      }
      if (this.nombreUsuario.length < 3 || this.nombreUsuario.length > 8) {
        return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
      }
      return '';
    }
  
    public validarPassword(): string {
      if (this.password.trim() === '') {
        return 'Para entrar al sistema debe ingresar la contraseña.';
      }
      if(this.password.trim() !== 'amenaive'){
        return 'Contraseña incorrecta.';
      }
   
      if (this.password.length > 10) {
        return 'La contraseña debe tener maximo 10 caracteres.';
      }
      return '';
    }
  
    public validarUsuario(): string {
      return this.validarNombreUsuario()
        || this.validarPassword();
    }
  }
  