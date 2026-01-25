# CameBastas
TP Final 

## Ideas
    1. Que el subastador tenga la opción de ponerle un tiempo límite a la publicación en caso de ver una oferta que le interese.

## Objetivo
    Es una página de subastas donde se pueden publicar artículos, las ofertas pueden ser productos, dinero o mixtas. Estas no tienen un tiempo límite, sino que el subastador selecciona la oferta que el quiera. 

## Entidades

    -- Usuarios
        -- Id (PK) --> u.id
        -- Nombre de usuario --> u.username
        -- Correo electrónico --> u.email
        -- Contraseña --> u.password
        -- Nombre completo --> u.name
        -- Teléfono --> u.tel
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
            -Botón de crear subasta
            -Foto del perfil con dropdown que contenga "Mi perfil" "Mis subastas" "Cerrar sesión"


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
                -Correo electrónico
                -Número de teléfono
                -Ubicación aproximada
                -Mis ofertas
                -Grilla con tus ofertas
                -Botón de eliminar 
                -Imagen
                -Título
                -Tipo de oferta
                -Monto/canje
                -Categoría
                -Filtro
    
    -- Mis subastas (dentro de Perfil)
        Grilla con tus subastas (activas e inactivas)
            -Título
            -Botón de editar(cambiar estado, precio base)
            -Botón de eliminar 
            -Imagen
            -Tipo de oferta
            -Precio inicial
            -Categoría
            -Filtro

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
            -Foto de perfil
            -Correo electrónico
            -Número de teléfono
            -Ubicación aproximada 
            -Contraseña

        



    