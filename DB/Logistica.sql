/*==============================================================*/
/* Database name:  Logistica                                    */
/* DBMS name:      Microsoft SQL Server 2005                    */
/* Created on:     23/07/2017 07:31:03 p.m.                     */
/*==============================================================*/


drop database Logistica
go

/*==============================================================*/
/* Database: Logistica                                          */
/*==============================================================*/
create database Logistica
go

use Logistica
go

/*==============================================================*/
/* Table: DatosPersona                                          */
/*==============================================================*/
create table DatosPersona (
   DatosPersonaId       numeric(10)          identity,
   UsuarioId            numeric(10)          null,
   Mail                 nvarchar(200)        null,
   Nombre               nvarchar(200)        null,
   Apellido             nvarchar(200)        null,
   Telefono             nvarchar(20)         null,
   Pais                 nvarchar(100)        null,
   PaisIso              nvarchar(5)          null,
   Provincia            nvarchar(30)         null,
   Ciudad               nvarchar(100)        null,
   TipoDocumento        nvarchar(100)        null,
   NumeroDocumento      nvarchar(30)         null,
   FechaNacimiento      datetime             null,
   Direccion            nvarchar(400)        null,
   CodigoPostal         nvarchar(10)         null,
   constraint PK_DATOSPERSONA primary key (DatosPersonaId)
)
go

/*==============================================================*/
/* Table: Menu                                                  */
/*==============================================================*/
create table Menu (
   MenuId               numeric(10)          identity,
   ParentId             numeric(10)          null,
   TipoUsuarioId        numeric(10)          null,
   Nombre               nvarchar(200)        null,
   Url                  nvarchar(400)        null,
   Icon                 nvarchar(400)        null,
   constraint PK_MENU primary key (MenuId)
)
go

/*==============================================================*/
/* Table: Producto                                              */
/*==============================================================*/
create table Producto (
   ProductoId           numeric(10)          identity,
   TipoProductoId       numeric(10)          null,
   TipoReservaId        numeric(10)          null,
   Nombre               nvarchar(400)        null,
   constraint PK_PRODUCTO primary key (ProductoId)
)
go

/*==============================================================*/
/* Table: Reserva                                               */
/*==============================================================*/
create table Reserva (
   ReservaId            numeric(10)          identity,
   ProductoId           numeric(10)          null,
   UsuarioId            numeric(10)          null,
   Fecha                datetime             null,
   Desde                datetime             null,
   Hasta                datetime             null,
   constraint PK_RESERVA primary key (ReservaId)
)
go

/*==============================================================*/
/* Table: TipoProducto                                          */
/*==============================================================*/
create table TipoProducto (
   TipoProductoId       numeric(10)          identity,
   Nombre               nvarchar(400)        null,
   constraint PK_TIPOPRODUCTO primary key (TipoProductoId)
)
go

/*==============================================================*/
/* Table: TipoReserva                                           */
/*==============================================================*/
create table TipoReserva (
   TipoReservaId        numeric(10)          not null,
   Descripcion          nvarchar(100)        null,
   constraint PK_TIPORESERVA primary key (TipoReservaId)
)
go

/*==============================================================*/
/* Table: TipoUsuario                                           */
/*==============================================================*/
create table TipoUsuario (
   TipoUsuarioId        numeric(10)          identity,
   Descripcion          nvarchar(200)        null,
   constraint PK_TIPOUSUARIO primary key (TipoUsuarioId)
)
go

/*==============================================================*/
/* Table: Usuario                                               */
/*==============================================================*/
create table Usuario (
   UsuarioId            numeric(10)          identity,
   TipoUsuarioId        numeric(10)          null,
   Mail                 nvarchar(200)        null,
   Password             nvarchar(100)        null,
   UltimoLogin          datetime             null default getdate(),
   constraint PK_USUARIO primary key (UsuarioId)
)
go

alter table DatosPersona
   add constraint FK_DatosPersona_Usuario foreign key (UsuarioId)
      references Usuario (UsuarioId)
go

alter table Menu
   add constraint FK_Menu_MenuParent foreign key (ParentId)
      references Menu (MenuId)
go

alter table Menu
   add constraint FK_TipoUsuario_Menu foreign key (TipoUsuarioId)
      references TipoUsuario (TipoUsuarioId)
go

alter table Producto
   add constraint FK_Producto_TipoReserva foreign key (TipoReservaId)
      references TipoReserva (TipoReservaId)
go

alter table Producto
   add constraint FK_TipoProducto_Producto foreign key (TipoProductoId)
      references TipoProducto (TipoProductoId)
go

alter table Reserva
   add constraint FK_Reserva_Producto foreign key (ProductoId)
      references Producto (ProductoId)
go

alter table Reserva
   add constraint FK_Reserva_Usuario foreign key (UsuarioId)
      references Usuario (UsuarioId)
go

alter table Usuario
   add constraint FK_Usuario_TipoUsuario foreign key (TipoUsuarioId)
      references TipoUsuario (TipoUsuarioId)
go

