# CameBastas
TP Final 

## Instrucciones para levantar el sistema

    Colocarse en el directorio raiz del proyecto: cd cameplace/

    Buildear el contenedor de docker : Docker compose build

    Levantar el contenedor : Docker compose up (-d en caso de si se quiere detached)    


## Objetivo
    Es una página de subastas donde se pueden publicar artículos, las ofertas pueden ser productos, dinero o mixtas. Estas no tienen un tiempo límite, sino que el subastador selecciona la oferta que el quiera. 

## Entidades

    -- Usuarios
        -- Id (PK) --> u.id
        -- Nombre de usuario --> u.username
        -- Correo electrónico --> u.email
        -- Contraseña --> u.password
        -- Nombre y Apellido--> u.name
        -- Teléfono --> u.tel
        --Biografia --> u.bio
        --Foto de Perfil --> u.foto
        -- Ubicación --> u.ubi
        -- Fecha de registro --> u.reg_date
        -- Fecha de modificación --> u.mod_date

    -- Subastas
        -- Id (PK) --> s.id
        -- Título --> s.name
        -- Descripción
        -- Precio inicial
        -- Categoría_id (FK de categorias)
        -- Condición
        -- Imágenes (js)
        -- Subastador (FK de usuarios)
        -- Tipo de oferta (canje, dinero, mixta)
        -- Estado de subasta (activo, vendido, inactivo)
        -- Ubicación_id (FK de usuarios)
        -- Fecha de creación
        -- Fecha de modificación

    -- Ofertas
        -- Id (PK) --> o.id
        -- Tipo de oferta (canje, dinero, mixta) <-- (Tabla fija)
        -- Título 
        -- Descripción
        -- Imágenes (js)
        -- Monto
        -- Id de vendedor <-- (FK de users)
        -- Id de ofertador <-- (FK de users)
        -- Id de subasta <-- (FK de subastas)
        --Estado (FK de status)
        -- Fecha de creación
        -- Fecha de modificación

    -- Tipo de oferta
        -- Producto
        -- Dinero
        -- Mixta

    -- Categorías
        -- Id
        -- Nombre
        -- Categoría_padre (por si es una subcategoría)

## Navbar
    ¿Qué contiene?
        Lado izquierdo: 
            -Logo (botón de inicio) 
        Lado derecho:
            Sin Logearse:
                Botones de "Iniciar Sesion" "Registro"   
            Logeado: 
                -Botón de crear subasta
                -Foto del perfil con dropdown que contiene "Mi perfil" "Mis subastas" "Mis Ofertas" "Cerrar sesión"


## Paginas

    -- Inicio
        ¿Que contiene el inicio?
            -Bienvenida (página temporal)
            -Barra de búsqueda
            -Dropdown de filtros
            -Subastas recientes

    -- Perfil
        ¿Qué contiene el perfil?
            Datos de usuario:
                -Nombre completo
                -Username
                -Foto de perfil
                -Número de teléfono
                -Botón de eliminar perfil
                -Botones para modificar perfil
                -Modal para cambiar contraseña

    
    -- Mis subastas
        Grilla con tus subastas y Filtro entre activas, inactivas y finalizadas
            -Título
            -Botón de editar(cambiar estado, precio base)
            -Boton de pausar subasta
            -Botón de eliminar 
            -Imagen
            -Tipo de oferta
            -Precio inicial
            -Categoría
            -Ultima modificacion

    -- Subasta
        -título
        -Imagen 
        -Descripción
        -Precio inicial (solo en opción dinero o mixto)
        -Categoría 
        -Tipo de canje (dinero, objeto y mixto)
        -Botón ofertar
        -Botón eliminar 

    -- Crear subasta
        Va a contener un formulario:
            -Título
            -Precio inicial
            -Categoría
            -Dropdown (condición)
            -Descripción
            -Imagenes
            -Dropdown (tipo de canje)
            -Botón de crear subasta
            -Boton de cancelar
    
    -- Inicio de sesión
        Formulario
            -Correo electrónico
            -Contraseña
            -Botón de "Iniciar Sesión"
            -Botón de "Registrarme"

    -- Registro
        Formulario:
            -Nombre completo
            -Username
            -Correo electrónico 
            -Contraseña

        



    