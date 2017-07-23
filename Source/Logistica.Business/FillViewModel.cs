

namespace Logistica.Business
{
    using Logistica.Common;
    using Logistica.Entity;
    using Logistica.ViewModel;
    internal static class FillViewModel
    {
        public static UsuarioViewModel FillUsuarioViewModel(Usuario user)
        {
            if (user != null)
            {
                var userView = user.MapperClass<UsuarioViewModel>(TypeMapper.IgnoreCaseSensitive);
                userView.TipoUsuarioId = user.TipoUsuario.Id;
                userView.DatosPersonaId = user.DatosPersona?.Id;
                userView.Nombre = user.DatosPersona?.Nombre;
                userView.Apellido = user.DatosPersona?.Apellido;
                return userView;
            }
            return null;
        }

        //public static JugadorViewModel FillJugadorViewModel(Jugador jugador)
        //{
        //    if (jugador != null)
        //    {
        //        var jugadorView = jugador.MapperClass<JugadorViewModel>();
        //        jugadorView.UsuarioId = jugador.Usuario.Id;
        //        jugadorView.Pais = jugador.Usuario.DatosPersona.Pais;
        //        jugadorView.PaisIso = jugador.Usuario.DatosPersona.PaisIso;
        //        if (jugador.Puesto != null)
        //        {
        //            jugadorView.PuestoId = jugador.Puesto.Id;
        //            jugadorView.PuestoDescripcion = jugador.Puesto.Descripcion;
        //        }
        //        return jugadorView;
        //    }
        //    return null;
        //}

        //public static PuestoViewModel FillPuestoViewModel(Puesto puesto)
        //{
        //    if (puesto != null)
        //    {
        //        var puestoViewModel = puesto.MapperClass<PuestoViewModel>();
        //        puestoViewModel.DeporteId = puesto.Deporte.Id;
        //        return puestoViewModel;
        //    }
        //    return null;
        //}

        //public static DatosPersonaViewModel FillDatosPersonaViewModel(DatosPersona datosPersona)
        //{
        //    if (datosPersona != null)
        //    {
        //        var dato = datosPersona.MapperClass<DatosPersonaViewModel>();
        //        dato.UsuarioId = datosPersona.Usuario.Id;
        //        return dato;
        //    }
        //    return null;
        //}

        //public static DeporteViewModel FillDeporteViewModel(Deporte deporte)
        //{
        //    return deporte?.MapperClass<DeporteViewModel>();
        //}
        //public static AntecedenteViewModel FillAntecedenteViewModel(Antecedente antecedente)
        //{
        //    var ante = antecedente?.MapperClass<AntecedenteViewModel>();
        //    if (ante != null)
        //    {
        //        ante.UsuarioId = antecedente.Usuario.Id;
        //    }
        //    return ante;
        //}

        //public static JugadorBusquedaViewModel FillJugadorBusquedaViewModel(Jugador jugador)
        //{
        //    if (jugador != null)
        //    {
        //        var jugadorView = jugador.MapperClass<JugadorBusquedaViewModel>(TypeMapper.IgnoreCaseSensitive);
        //        jugadorView.Id = jugador.Id;
        //        jugadorView.PuestoDescripcion = jugador.Puesto?.Descripcion;
        //        jugador.MapperClass(jugador.Usuario.DatosPersona, TypeMapper.IgnoreCaseSensitive);
        //        jugadorView.PuestoDescripcion = jugador.Puesto?.Descripcion;
        //        jugadorView.Pais = jugador.Usuario.DatosPersona.Pais;
        //        jugadorView.PaisIso = jugador.Usuario.DatosPersona.PaisIso;
        //        return jugadorView;
        //    }
        //    return null;
        //}


    }
}