using System;
using System.Runtime.Serialization;

namespace Logistica.ViewModel
{
    public class DatosPersonaViewModel
    {
        #region Atributos
        public long Id { get; set; }
        public String Apellido { get; set; }
        public String Ciudad { get; set; }
        public String CodigoPostal { get; set; }
        public String Direccion { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public String Mail { get; set; }
        public String Nombre { get; set; }
        public String NumeroDocumento { get; set; }
        public String Pais { get; set; }
        public String PaisIso { get; set; }
        public String Provincia { get; set; }
        public String Telefono { get; set; }
        public String TipoDocumento { get; set; }
        public long UsuarioId { get; set; }
        #endregion
    }
}