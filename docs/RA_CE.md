## RA 3 – Gestiona la persistencia de los datos identificando herramientas de mapeo objeto-relacional (ORM) y desarrollando aplicaciones que las utilizan

| **Criterio de Evaluación**                                                                 | **Contenidos Asociados**                                                                                                                                                                                                                                   |
|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| a) Se ha instalado la herramienta ORM.                                                    | - Introducción a los ORM (Hibernate, JPA, Spring Data JPA)  <br> - Instalación y configuración en proyectos Kotlin/Java con Maven o Gradle                                                                                                                  |
| b) Se ha configurado la herramienta ORM.                                                  | - Configuración del `persistence.xml` o `application.properties/yml` <br> - Integración con bases de datos (PostgreSQL, H2, MySQL)                                                                                                                         |
| c) Se han definido configuraciones de mapeo.                                              | - Anotaciones JPA (`@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`) <br> - Relaciones: `@OneToMany`, `@ManyToOne`, `@OneToOne`, `@ManyToMany`                                                                                                     |
| d) Se han aplicado mecanismos de persistencia a los objetos.                              | - EntityManager o interfaces `CrudRepository` / `JpaRepository` <br> - Métodos `persist`, `merge`, `remove`, `find`, etc.                                                                                                                                |
| e) Se han desarrollado aplicaciones que modifican y recuperan objetos persistentes.       | - CRUD completo desde una aplicación Kotlin o Java <br> - Casos de uso: altas, bajas, modificaciones y consultas                                                                                                                                        |
| f) Se han desarrollado aplicaciones que realizan consultas usando el lenguaje SQL.        | - Consultas con JPQL (`SELECT e FROM Entidad e WHERE...`) <br> - Consultas nativas con `@Query(nativeQuery = true)`                                                                                                                                        |
| g) Se han gestionado las transacciones.                                                   | - Gestión con `@Transactional` <br> - Control de transacciones automáticas y manuales en JPA y Spring <br> - Manejo de errores y rollbacks                                                                                                                |

## Contenidos 


7# 🧩 Unidad Didáctica: Persistencia de datos con ORM (RA 3)

## RA 3 – Gestiona la persistencia de los datos identificando herramientas de mapeo objeto-relacional (ORM) y desarrollando aplicaciones que las utilizan

---

## 1. Introducción a la persistencia y a los ORM
- Qué es la persistencia de datos
- Ventajas del mapeo objeto-relacional
- Herramientas ORM: Hibernate, JPA, Spring Data JPA
- Ciclo de vida de un objeto persistente

> **Objetivo:** Comprender el papel del ORM en el desarrollo de aplicaciones con bases de datos relacionales.

---

## 2. Instalación y configuración básica del ORM
- Estructura de un proyecto con ORM en Kotlin (Maven/Gradle)
- Añadir dependencias (Hibernate, Spring Boot Data JPA)
- Configurar `application.properties` o `persistence.xml`
- Conexión con una base de datos (PostgreSQL, H2, etc.)

> **Objetivo:** Preparar el entorno para trabajar con ORM en proyectos reales.

---

## 3. Mapeo de clases a tablas
- Definir entidades con `@Entity` y `@Table`
- Campos persistentes: `@Id`, `@GeneratedValue`, `@Column`
- Relaciones:
  - `@OneToOne`
  - `@OneToMany`
  - `@ManyToOne`
  - `@ManyToMany`
- Estrategias de generación de claves

> **Objetivo:** Transformar estructuras de objetos en esquemas relacionales correctamente.

---

## 4. Persistencia de objetos
- Operaciones básicas con `EntityManager` o `CrudRepository`:
  - `persist`, `merge`, `remove`, `find`, `save`, `deleteById`
- Guardar, modificar y eliminar objetos
- Cargar objetos desde la base de datos

> **Objetivo:** Manipular datos en la base de datos a través de objetos Kotlin o Java.

---

## 5. Consultas con JPQL y SQL nativo
- Introducción a JPQL
- Consultas con `@Query`
- Filtros, condiciones y parámetros
- Consultas nativas con SQL
- DTOs y proyecciones

> **Objetivo:** Consultar información con un lenguaje orientado a objetos o directamente con SQL.

---

## 6. Gestión de transacciones
- Qué es una transacción y por qué es importante
- Anotación `@Transactional`
- Transacciones automáticas y manuales
- Rollbacks y control de errores

> **Objetivo:** Garantizar la integridad de los datos mediante control de transacciones.

---

## 7. Proyecto práctico integrador
- Desarrollo de una pequeña aplicación CRUD con Spring Boot y PostgreSQL
- Crear entidad-relación simple (por ejemplo, Clientes y Pedidos)
- Operaciones completas de alta, baja, modificación y consulta
- Gestión de relaciones y transacciones

> **Objetivo:** Consolidar los aprendizajes aplicando todo el ciclo de persistencia con ORM.



# Unidad Didáctica: Persistencia de Datos con Herramientas ORM (JPA/Hibernate)

**Destinatarios:** Alumnos de 2º DAM  
**Duración estimada:** 20-24 sesiones

---

## 1. Introducción a ORM y JPA/Hibernate

- **Conceptos clave**
  - ¿Qué es un ORM? Ventajas y desventajas.
  - Diferencias entre JDBC y ORM.
  - Arquitectura de JPA (Java Persistence API) e implementaciones (Hibernate, EclipseLink).
- **Herramientas ORM en el mercado**
  - Hibernate, Spring Data JPA, JOOQ.
  - Casos de uso en aplicaciones empresariales.

---

## 2. Instalación y Configuración de Herramientas ORM

- **Entorno de desarrollo**
  - Configuración de un proyecto Maven/Gradle con dependencias de Hibernate y Spring Data JPA.
  - Archivos de configuración: `persistence.xml` (JPA) o `application.properties` (Spring Boot).
- **Conexión a la base de datos**
  - Configuración de dialectos (MySQL, PostgreSQL, SQLite).
  - Parámetros esenciales: URL, usuario, contraseña, pool de conexiones.

---

## 3. Mapeo de Entidades con Anotaciones JPA

- **Clases persistentes**
  - Anotaciones básicas: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`.
  - Tipos de datos y mapeo de columnas (`@Column`).
- **Relaciones entre entidades**
  - `@OneToMany`, `@ManyToOne`, `@ManyToMany`.
  - Mapeo de herencia: estrategias (`SINGLE_TABLE`, `JOINED`, `TABLE_PER_CLASS`).
- **Colecciones y tipos avanzados**
  - Mapeo de listas (`@ElementCollection`), enumeraciones (`@Enumerated`), fechas (`@Temporal`).

---

## 4. Operaciones CRUD con JPA/Hibernate

- **EntityManager y Repository (Spring Data JPA)**
  - Métodos básicos: `persist()`, `merge()`, `remove()`, `find()`.
  - Uso de `CrudRepository` y `JpaRepository` en Spring Data.
- **Estados de un objeto**
  - Transitorio, persistente, detached, eliminado.
- **Ejemplos prácticos**
  - Inserción de registros.
  - Actualización y eliminación.
  - Recuperación por ID y consultas simples.

---

## 5. Consultas con JPQL y SQL Nativo

- **JPQL (Java Persistence Query Language)**
  - Sintaxis básica: `SELECT`, `FROM`, `WHERE`, `JOIN`.
  - Consultas parametrizadas (`:param`).
  - Consultas con proyecciones y DTOs.
- **SQL nativo**
  - Uso de `@Query` en Spring Data.
  - Resultados mapeados a entidades o objetos personalizados.
- **Consultas nombradas**
  - Definición con `@NamedQuery`.

---

## 6. Gestión de Transacciones

- **Transacciones en JPA**
  - Configuración de `@Transactional` (Spring) o `EntityTransaction` (JPA puro).
  - Propagación de transacciones (`REQUIRED`, `REQUIRES_NEW`).
- **Manejo de errores**
  - Rollback automático y manual.
  - Excepciones comunes: `OptimisticLockException`, `PersistenceException`.
- **Ejemplo práctico**
  - Transferencia bancaria con commit/rollback.

---

## 7. Integración con Spring Boot y Spring Data JPA

- **Spring Boot Starter Data JPA**
  - Configuración automática de datasource.
  - Repositorios automáticos: `findByNombre()`, `count()`, etc.
- **Casos avanzados**
  - Paginación (`Pageable`).
  - Auditoría de entidades (`@CreatedDate`, `@LastModifiedDate`).

---

## 8. Proyecto Práctico Integrador

- **Desarrollo de una API REST**
  - CRUD completo para entidades relacionadas (ej: Biblioteca con `Libro`, `Autor`, `Préstamo`).
  - Uso de Postman para pruebas.
- **Requisitos técnicos**
  - Spring Boot + Hibernate + Base de datos relacional.
  - Gestión de transacciones en servicios.
  - Consultas JPQL y personalizadas.

---

## Evaluación

- **Actividades**
  - Ejercicios de mapeo con anotaciones.
  - Desarrollo de un módulo de gestión de pedidos con transacciones.
  - Prueba escrita sobre conceptos teóricos (JPQL, estados de objetos).
- **Rúbricas**
  - Correcta configuración de la herramienta ORM.
  - Uso eficiente de consultas y relaciones.
  - Manejo robusto de transacciones y errores.

---
