using Logistica.Business;
using Logistica.DataAccess;
using Logistica.Entity;
using Logistica.IBusiness;
using Logistica.IDataAccess;

namespace Logistica.Configuration
{
    using System;
    //using Logistica.Business;
    //using Logistica.IBusiness;
    //using Logistica.Entity;
    using Logistica.Configuration.Interception;
    //using Logistica.DataAccess;
    //using Logistica.IDataAccess;
    using Logistica.UnityInject;
    using Microsoft.Practices.Unity;
    using Microsoft.Practices.Unity.InterceptionExtension;



    public class ConfigAll : IDisposable
    {
       
        private ConfigAll()
        {
        }

        private static ConfigAll instance = null;
        // Propiedad para acceder a la instancia
        public static ConfigAll Instance
        {
            get
            {
                return instance ?? new ConfigAll();
            }
        }
        public bool IsClearContainer
        {
            get { return DependencyFactory.IsClearContainer; }
        }
        public void Init()
        {
            #region DataAccess
            DependencyFactory.RegisterType<IUsuarioDA, UsuarioDA>(
                new InjectionMember[]
                {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
                }
                );

            #region genericos
            DependencyFactory.RegisterType<IBaseDA<DatosPersona>, CommonDA<DatosPersona>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            DependencyFactory.RegisterType<IBaseDA<Menu>, CommonDA<Menu>>(
                new InjectionMember[]
                {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
                }
                );
            DependencyFactory.RegisterType<IBaseDA<Producto>, CommonDA<Producto>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            DependencyFactory.RegisterType<IBaseDA<Reserva>, CommonDA<Reserva>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            DependencyFactory.RegisterType<IBaseDA<TipoProducto>, CommonDA<TipoProducto>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            DependencyFactory.RegisterType<IBaseDA<TipoReserva>, CommonDA<TipoReserva>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            DependencyFactory.RegisterType<IBaseDA<TipoUsuario>, CommonDA<TipoUsuario>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            DependencyFactory.RegisterType<IBaseDA<Usuario>, CommonDA<Usuario>>(
               new InjectionMember[]
               {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorDataAccess>()
               }
               );
            //DependencyFactory.RegisterType<IBaseDA<TemplateEvaluacionDetalle>, CommonDA<TemplateEvaluacionDetalle>>(
            //   new InjectionMember[]
            //   {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //   }
            //   );
            //DependencyFactory.RegisterType<IBaseDA<TipoUsuario>, CommonDA<TipoUsuario>>(
            //   new InjectionMember[]
            //   {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //   }
            //   );
            //DependencyFactory.RegisterType<IBaseDA<TipoVideo>, CommonDA<TipoVideo>>(
            //   new InjectionMember[]
            //   {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //   }
            //   );
            //DependencyFactory.RegisterType<IBaseDA<Usuario>, CommonDA<Usuario>>(
            //   new InjectionMember[]
            //   {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //   }
            //   );
            //DependencyFactory.RegisterType<IBaseDA<UsuarioAplicativo>, CommonDA<UsuarioAplicativo>>(
            //   new InjectionMember[]
            //   {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //   }
            //   );
            //DependencyFactory.RegisterType<IBaseDA<Video>, CommonDA<Video>>(
            //   new InjectionMember[]
            //   {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //   }
            //   );
            //DependencyFactory.RegisterType<IBaseDA<TipoEvaluacion>, CommonDA<TipoEvaluacion>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //  }
            //  );
            //DependencyFactory.RegisterType<IBaseDA<Entrenador>, CommonDA<Entrenador>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //  }
            //  );
            //DependencyFactory.RegisterType<IBaseDA<Intermediario>, CommonDA<Intermediario>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //  }
            //  );
            //DependencyFactory.RegisterType<IBaseDA<Club>, CommonDA<Club>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //  }
            //  );
            //DependencyFactory.RegisterType<IBaseDA<ClubDetalle>, CommonDA<ClubDetalle>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorDataAccess>()
            //  }
            //  );
            //DependencyFactory.RegisterType<IBaseDA<LogActividad>, CommonDA<LogActividad>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //  }
            //  );
            //DependencyFactory.RegisterType<IBaseDA<LogError>, CommonDA<LogError>>(
            //  new InjectionMember[]
            //  {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //  }
            //  );
            #endregion
            #endregion

            #region Business
            DependencyFactory.RegisterType<ILoginBusiness, LoginBusiness>(
                new InjectionMember[]
                {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorBusiness>()
                }
                );

            DependencyFactory.RegisterType<IUsuarioBusiness, UsuarioBusiness>(
                new InjectionMember[]
                {
                    new Interceptor<VirtualMethodInterceptor>(),
                    new InterceptionBehavior<InterceptorBusiness>()
                }
                );
            //DependencyFactory.RegisterType<ICommonBusiness, CommonBusiness>(
            //    new InjectionMember[]
            //    {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorBusiness>()
            //    }
            //    );
            //DependencyFactory.RegisterType<IBusquedaBusiness, BusquedaBusiness>(
            //    new InjectionMember[]
            //    {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorBusiness>()
            //    }
            //    );
            //DependencyFactory.RegisterType<IUsuarioJugadorBusiness, UsuarioJugadorBusiness>(
            //    new InjectionMember[]
            //    {
            //        new Interceptor<VirtualMethodInterceptor>(),
            //        new InterceptionBehavior<InterceptorBusiness>()
            //    }
            //    ); 
            #endregion
        }

        public void Dispose()
        {
            DependencyFactory.ClearContainer();
            instance = null;
        }
    }
}
