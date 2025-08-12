
# 🛠 Proyecto Kotlin + JPA (puro) + SQLite con Gradle (sin Spring)

Este proyecto usa SQLite como base de datos, el estándar JPA como API de persistencia, y Hibernate como proveedor por debajo, pero trabajando directamente con JPA en lugar de las clases específicas de Hibernate.


## 📁 Estructura del proyecto

    jpa-kotlin-sqlite/
    ├── build.gradle.kts
    ├── settings.gradle.kts
    └── src/
    └── main/
    ├── kotlin/
    │ └── com/ejemplo/
    │ ├── Main.kt
    │ ├── SQLiteDialect.kt
    │ └── modelo/Producto.kt
    └── resources/
    └── META-INF/
    └── persistence.xml

    
---

## ⚙️ Paso 1: `build.gradle.kts`


        plugins {
            kotlin("jvm") version "1.9.10"
            application
        }

        group = "com.ejemplo"
        version = "1.0"

        repositories {
            mavenCentral()
        }

        dependencies {
            implementation(kotlin("stdlib"))

            // JPA API
            implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")

            // Hibernate como proveedor JPA
            implementation("org.hibernate.orm:hibernate-core:6.4.4.Final")

            // Driver SQLite
            implementation("org.xerial:sqlite-jdbc:3.44.1.0")
        }

        application {
            mainClass.set("com.ejemplo.MainKt")
        }


⚙️ Paso 2: settings.gradle.kts

    rootProject.name = "jpa-kotlin-sqlite"


 Paso 3: persistence.xml en src/main/resources/META-INF/


        <?xml version="1.0" encoding="UTF-8"?>
        <persistence xmlns="https://jakarta.ee/xml/ns/persistence"
                    version="3.0">
            <persistence-unit name="miUnidad" transaction-type="RESOURCE_LOCAL">
                <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>

                <class>com.ejemplo.modelo.Producto</class>
                <properties>
                    <property name="jakarta.persistence.jdbc.driver" value="org.sqlite.JDBC"/>
                    <property name="jakarta.persistence.jdbc.url" value="jdbc:sqlite:miBD.db"/>
                    <property name="jakarta.persistence.jdbc.user" value=""/>
                    <property name="jakarta.persistence.jdbc.password" value=""/>

                    <property name="hibernate.dialect" value="com.ejemplo.SQLiteDialect"/>
                    <property name="hibernate.hbm2ddl.auto" value="update"/>
                    <property name="hibernate.show_sql" value="true"/>
                </properties>
            </persistence-unit>
        </persistence>


Paso 4: Dialecto SQLite personalizado (SQLiteDialect.kt)

        package com.ejemplo

        import org.hibernate.dialect.Dialect
        import org.hibernate.dialect.identity.IdentityColumnSupportImpl
        import org.hibernate.dialect.identity.IdentityColumnSupport
        import java.sql.Types

        class SQLiteDialect : Dialect() {
            override fun getIdentityColumnSupport(): IdentityColumnSupport = object : IdentityColumnSupportImpl() {
                override fun supportsIdentityColumns() = true
                override fun getIdentitySelectString(table: String?, column: String?, type: Int) = "select last_insert_rowid()"
                override fun getIdentityColumnString(type: Int) = "integer"
            }

            init {
                registerColumnType(Types.INTEGER, "integer")
                registerColumnType(Types.VARCHAR, "text")
                registerColumnType(Types.DOUBLE, "double")
            }

            override fun hasAlterTable() = false
            override fun dropConstraints() = false
            override fun getAddColumnString() = "add column"
            override fun supportsIfExistsBeforeTableName() = true
            override fun supportsCascadeDelete() = false
        }


 Paso 5: Entidad JPA Producto.kt

        package com.ejemplo.modelo

        import jakarta.persistence.*

        @Entity
        @Table(name = "productos")
        data class Producto(
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            val id: Long = 0,

            @Column(nullable = false)
            val nombre: String,

            val precio: Double
        )


 Paso 6: Clase principal Main.kt

        package com.ejemplo

        import com.ejemplo.modelo.Producto
        import jakarta.persistence.Persistence

        fun main() {
            val emf = Persistence.createEntityManagerFactory("miUnidad")
            val em = emf.createEntityManager()

            val producto = Producto(nombre = "Tablet", precio = 299.99)

            em.transaction.begin()
            em.persist(producto)
            em.transaction.commit()

            em.close()
            emf.close()

            println("Producto guardado en base de datos SQLite con JPA.")
        }

🧪 Verificación

- Al ejecutar el programa se crea el archivo miBD.db
- Se insertará un producto en la tabla productos
- Puedes abrirlo con SQLiteStudio, DB Browser, DBeaver, etc.