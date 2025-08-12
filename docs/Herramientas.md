# Hibernate

En el desarrollo de aplicaciones que usan bases de datos relacionales, las herramientas ORM (**Object-Relational Mapping**) permiten **gestionar la persistencia de objetos** sin tener que escribir SQL manualmente.

Hibernate es una **implementación directa de JPA**, que permite persistir objetos Java/Kotlin sin usar Spring. Se utiliza mucho en proyectos donde se desea controlar cada detalle del proceso de persistencia.

Características

- Gestión manual de sesiones (`Session`, `SessionFactory`)
- Configuración mediante `hibernate.cfg.xml` o `persistence.xml`
- Ideal para aprender el funcionamiento interno de un ORM

### Instalación 

En este apartado veremos como configurar un proyecto en IntelliJ con **Hibernate + Kotlin + Gradle**, tanto para una BD **Postgres** alojada en un servidor como para una BD embebida **SQlite**, sin necesidad de instalación del servidor.

#### Proyecto con PostgreSQL

**📁 Estructura del proyecto**

    hibernate-gradle-kotlin/
    ├── build.gradle.kts
    ├── settings.gradle.kts
    └── src/
    └── main/
    ├── kotlin/
    │ └── com/ejemplo/
    │ ├── Main.kt
    │ └── modelo/Producto.kt
    └── resources/
    └── hibernate.cfg.xml


---

**⚙️ Paso 1: Configurar `build.gradle.kts`**


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
        // Kotlin
        implementation(kotlin("stdlib"))

        // Hibernate Core
        implementation("org.hibernate.orm:hibernate-core:6.4.4.Final")

        // Driver PostgreSQL (puedes cambiar por H2 si quieres algo embebido)
        implementation("org.postgresql:postgresql:42.7.1")

        // JPA API
        implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")
    }

    application {
        mainClass.set("com.ejemplo.MainKt") // Importante: termina en Kt
    }


**⚙️ Paso 2: settings.gradle.kts**

    rootProject.name = "hibernate-gradle-kotlin"


**Paso 3: Crear hibernate.cfg.xml en src/main/resources**

    <!DOCTYPE hibernate-configuration PUBLIC
            "-//Hibernate/Hibernate Configuration DTD 5.3//EN"
            "http://hibernate.org/dtd/hibernate-configuration-5.3.dtd">
    <hibernate-configuration>
        <session-factory>
            <property name="hibernate.connection.driver_class">org.postgresql.Driver</property>
            <property name="hibernate.connection.url">jdbc:postgresql://localhost:5432/tienda</property>
            <property name="hibernate.connection.username">postgres</property>
            <property name="hibernate.connection.password">admin</property>

            <property name="hibernate.dialect">org.hibernate.dialect.PostgreSQLDialect</property>
            <property name="hibernate.hbm2ddl.auto">update</property>
            <property name="hibernate.show_sql">true</property>

            <mapping class="com.ejemplo.modelo.Producto"/>
        </session-factory>
    </hibernate-configuration>

**Paso 4: Crear clase de entidad Producto.kt**

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

**Paso 5: Clase principal Main.kt**

        package com.ejemplo

        import com.ejemplo.modelo.Producto
        import org.hibernate.cfg.Configuration

        fun main() {
            val sessionFactory = Configuration()
                .configure() // lee hibernate.cfg.xml
                .buildSessionFactory()

            val producto = Producto(nombre = "Monitor", precio = 199.99)

            sessionFactory.openSession().use { session ->
                session.beginTransaction()
                session.persist(producto)
                session.transaction.commit()
            }

            println("Producto guardado con éxito.")
        }


🧪 Verificación

- Ejecuta el proyecto con el botón de play en Main.kt.
- Verifica en PostgreSQL que se ha creado la tabla y se ha insertado el registro.


#### 🛠 Proyecto con SQLite


**📁 Estructura del proyecto**

    hibernate-kotlin-sqlite/
    ├── build.gradle.kts
    ├── settings.gradle.kts
    └── src/
    └── main/
    ├── kotlin/
    │ └── com/ejemplo/
    │ ├── Main.kt
    │ └── modelo/Producto.kt
    └── resources/
    └── hibernate.cfg.xml


---

**⚙️ Paso 1: `build.gradle.kts`**


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

            // Hibernate ORM
            implementation("org.hibernate.orm:hibernate-core:6.4.4.Final")

            // Driver SQLite
            implementation("org.xerial:sqlite-jdbc:3.44.1.0")

            // JPA API
            implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")
        }

        application {
            mainClass.set("com.ejemplo.MainKt")
        }


**⚙️ Paso 2: settings.gradle.kts**

    rootProject.name = "hibernate-kotlin-sqlite"


**Paso 3: hibernate.cfg.xml en src/main/resources**

        <!DOCTYPE hibernate-configuration PUBLIC
                "-//Hibernate/Hibernate Configuration DTD 5.3//EN"
                "http://hibernate.org/dtd/hibernate-configuration-5.3.dtd">
        <hibernate-configuration>
            <session-factory>

                <!-- Configuración SQLite -->
                <property name="hibernate.connection.driver_class">org.sqlite.JDBC</property>
                <property name="hibernate.connection.url">jdbc:sqlite:datos.db</property>
                <property name="hibernate.dialect">org.hibernate.dialect.SQLiteDialect</property> <!-- esto requiere un dialecto personalizado -->
                <property name="hibernate.hbm2ddl.auto">update</property>
                <property name="hibernate.show_sql">true</property>

                <!-- Entidades -->
                <mapping class="com.ejemplo.modelo.Producto"/>
            </session-factory>
        </hibernate-configuration>

⚠️ Hibernate no incluye un dialecto oficial para SQLite. Usamos uno personalizado a continuación.

**Paso 4: Crear un dialecto personalizado para SQLite**

Archivo: src/main/kotlin/com/ejemplo/SQLiteDialect.kt

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


🔧 Y en hibernate.cfg.xml, cambia el dialecto:

    <property name="hibernate.dialect">com.ejemplo.SQLiteDialect</property>


**Paso 5: Clase de entidad Producto.kt**

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


**Paso 6: Clase principal Main.kt**


        package com.ejemplo

        import com.ejemplo.modelo.Producto
        import org.hibernate.cfg.Configuration

        fun main() {
            val sessionFactory = Configuration()
                .configure()
                .buildSessionFactory()

            val producto = Producto(nombre = "Lápiz óptico", precio = 12.99)

            sessionFactory.openSession().use { session ->
                session.beginTransaction()
                session.persist(producto)
                session.transaction.commit()
            }

            println("Producto guardado en archivo SQLite.")
        }

✅ Verificación

- Ejecuta el programa.
- Se crea el archivo datos.db en la raíz del proyecto.
- Puedes abrirlo con DBeaver, SQLiteStudio, DB Browser for SQLite, etc.
<!--
## 2. JPA (Java Persistence API)

JPA es una especificación estándar que define cómo debe comportarse un ORM. No es una herramienta en sí, sino una interfaz común. Hibernate es la implementación más habitual.

**Características**

- Uso de anotaciones como @Entity, @Id, @OneToMany
- Separación entre la interfaz (JPA) y la implementación (Hibernate)
- Se utiliza con EntityManager en lugar de Session

### 🛠 Instalación
Proyecto Kotlin + JPA (puro) + SQLite con Gradle (sin Spring)

Este proyecto usa SQLite como base de datos, el estándar JPA como API de persistencia, y Hibernate como proveedor por debajo, pero trabajando directamente con JPA en lugar de las clases específicas de Hibernate.


**Estructura del proyecto**

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

**⚙️ Paso 1: `build.gradle.kts`**


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


**⚙️ Paso 2: settings.gradle.kts**

    rootProject.name = "jpa-kotlin-sqlite"


**Paso 3: persistence.xml en src/main/resources/META-INF/**


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


**Paso 4: Dialecto SQLite personalizado (SQLiteDialect.kt)**

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


**Paso 5: Entidad JPA Producto.kt**

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


**Paso 6: Clase principal Main.kt**

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


## 3. Spring Data JPA (con Spring Boot)


Spring Data JPA es una abstracción de alto nivel sobre JPA. Automatiza gran parte del trabajo repetitivo y permite centrarse en la lógica del negocio. Usa Hibernate por debajo y es la más recomendada en entornos modernos con Kotlin.

### 🧩 Características

- Repositorios automáticos (JpaRepository)
- Configuración simplificada con Spring Boot
- CRUD sin escribir SQL ni lógica de persistencia

### 💡 Ejemplo básico:

    // Entidad
    @Entity
    data class Producto(
        @Id @GeneratedValue val id: Long = 0,
        val nombre: String,
        val precio: Double
    )

    // Repositorio
    interface ProductoRepository : JpaRepository<Producto, Long>

    // Controlador REST
    @RestController
    @RequestMapping("/productos")
    class ProductoController(private val repo: ProductoRepository) {

        @PostMapping fun crear(@RequestBody producto: Producto) = repo.save(producto)
        @GetMapping fun listar() = repo.findAll()
    }
-->