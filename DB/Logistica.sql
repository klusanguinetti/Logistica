/*==============================================================*/
/* Database name:  Logistica                                    */
/* DBMS name:      Microsoft SQL Server 2005                    */
/* Created on:     20/11/2017 12:59:15 p.m.                     */
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
/* Table: Cliente                                               */
/*==============================================================*/
create table Cliente (
   ClienteId            numeric(10)          identity,
   Mail                 nvarchar(200)        null,
   RazonSocial          nvarchar(400)        null,
   CUIT                 nvarchar(20)         null,
   Provincia            nvarchar(100)        null,
   Partido              nvarchar(100)        null,
   Localidad            nvarchar(100)        null,
   Direccion            nvarchar(800)        null,
   Observaciones        nvarchar(4000)       null,
   Telefono             nvarchar(40)         null,
   Telefono2            nvarchar(40)         null,
   Estado               nvarchar(2)          null,
   FechaAlta            datetime             null,
   constraint PK_CLIENTE primary key (ClienteId)
)
go

/*==============================================================*/
/* Table: Contacto                                              */
/*==============================================================*/
create table Contacto (
   ContactoId           numeric(10)          identity,
   ClienteId            numeric(10)          null,
   Nombre               nvarchar(200)        null,
   Apellido             nvarchar(200)        null,
   Telefono             nvarchar(200)        null,
   Mail                 nvarchar(400)        null,
   constraint PK_CONTACTO primary key (ContactoId)
)
go

/*==============================================================*/
/* Table: Equipo                                                */
/*==============================================================*/
create table Equipo (
   EquipoId             numeric(10)          identity,
   ProductoId           numeric(10)          null,
   NumeroSerie          nvarchar(20)         null,
   Estado               nvarchar(2)          null,
   Ubicacion            nvarchar(400)        null,
   FechaAlta            datetime             null,
   FechaBaja            datetime             null,
   constraint PK_EQUIPO primary key (EquipoId)
)
go

/*==============================================================*/
/* Table: Producto                                              */
/*==============================================================*/
create table Producto (
   ProductoId           numeric(10)          identity,
   ProductoDetalleId    numeric(10)          null,
   Nombre               nvarchar(400)        null,
   Descripcion          nvarchar(4000)       null,
   FechaAlta            datetime             null,
   FechaBaja            datetime             null,
   Estado               nvarchar(2)          null,
   constraint PK_PRODUCTO primary key (ProductoId)
)
go

/*==============================================================*/
/* Table: ProductoDetalle                                       */
/*==============================================================*/
create table ProductoDetalle (
   ProductoDetalleId    numeric(10)          identity,
   Descripcion          nvarchar(400)        null,
   Informacion          nvarchar(4000)       null,
   Precio               numeric(12,2)        null,
   FechaAlta            datetime             null,
   FechaBaja            datetime             null,
   Estado               nvarchar(2)          null,
   constraint PK_PRODUCTODETALLE primary key (ProductoDetalleId)
)
go

/*==============================================================*/
/* Table: ProductoImage                                         */
/*==============================================================*/
create table ProductoImage (
   ProductoImageId      numeric(10)          identity,
   ProductoId           numeric(10)          null,
   ImageUrl             nvarchar(400)        null,
   "Default"            nvarchar(2)          null,
   FechaAlta            datetime             null,
   FechaBaja            datetime             null,
   Estado               nvarchar(2)          null,
   constraint PK_PRODUCTOIMAGE primary key (ProductoImageId)
)
go

/*==============================================================*/
/* Table: Reserva                                               */
/*==============================================================*/
create table Reserva (
   ReservaId            numeric(10)          identity,
   EquipoId             numeric(10)          null,
   ProductoDetalleId    numeric(10)          null,
   ClienteId            numeric(10)          null,
   UsuarioConfirmacionId numeric(10)          null,
   Provincia            nvarchar(100)        null,
   Partido              nvarchar(100)        null,
   Localidad            nvarchar(100)        null,
   Direccion            nvarchar(800)        null,
   Observaciones        nvarchar(4000)       null,
   Estado               nvarchar(2)          null,
   Telefono             nvarchar(40)         null,
   Telefono2            nvarchar(40)         null,
   FleteAsignado        nvarchar(200)        null,
   FechaDesde           datetime             null,
   FechaHasta           datetime             null,
   FechaDespacho        datetime             null,
   FechaDevolucion      datetime             null,
   SolicitudLlamado     nvarchar(2)          null,
   SolicitudEstado      nvarchar(2)          null,
   TotalSinFlete        numeric(12,2)        null,
   TotalFlete           numeric(12,2)        null,
   Total                numeric(12,2)        null,
   constraint PK_RESERVA primary key (ReservaId)
)
go

/*==============================================================*/
/* Table: Usuario                                               */
/*==============================================================*/
create table Usuario (
   UsuarioId            numeric(10)          identity,
   ClienteId            numeric(10)          null,
   Mail                 nvarchar(200)        null,
   Password             nvarchar(100)        null,
   UltimoLogin          datetime             null default getdate(),
   Estado               nvarchar(2)          null,
   constraint PK_USUARIO primary key (UsuarioId)
)
go

alter table Contacto
   add constraint FK_Cliente_Contacto foreign key (ClienteId)
      references Cliente (ClienteId)
go

alter table Equipo
   add constraint FK_Producto_Equipo foreign key (ProductoId)
      references Producto (ProductoId)
go

alter table Producto
   add constraint FK_Producto_ProductoDetalle foreign key (ProductoDetalleId)
      references ProductoDetalle (ProductoDetalleId)
go

alter table ProductoImage
   add constraint FK_Producto_ProductoImagen foreign key (ProductoId)
      references Producto (ProductoId)
go

alter table Reserva
   add constraint FK_Cliente_Reserva foreign key (ClienteId)
      references Cliente (ClienteId)
go

alter table Reserva
   add constraint FK_Equipo_Reserva foreign key (EquipoId)
      references Equipo (EquipoId)
go

alter table Reserva
   add constraint FK_ProductoDetalle_Reserva foreign key (ProductoDetalleId)
      references ProductoDetalle (ProductoDetalleId)
go

alter table Reserva
   add constraint FK_Reserva_Usuario foreign key (UsuarioConfirmacionId)
      references Usuario (UsuarioId)
go

alter table Usuario
   add constraint FK_Usuario_Cliente foreign key (ClienteId)
      references Cliente (ClienteId)
go

