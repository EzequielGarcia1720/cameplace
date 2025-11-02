# CameBastas
TP Final 

## IDEAS
    1. Que el subastador tenga la opcion de ponerle un tiempo limite a la publicacion en caso de ver una oferta que le interese


## Objetivo
    Es una pagina de subastas donde se pueden publicar articulos, las ofertas pueden ser productos, dinero o mixtas. Estas no tienen un tiempo limite, sino que el subastador selecciona la oferta que el quiera. 

## Entidades

    -- Usuarios
        -- Id (PK) --> u.id
        -- Nombre de usuario --> u.username
        -- Correo electronico --> u.email
        -- Contraseña --> u.password
        -- Nombre completo --> u.name
        -- Telefono --> u.tel
        -- Ubicacion --> u.ubi
        -- Fecha de registro --> u.reg_date
        -- Fecha de modificacion --> u.mod_date

    -- Subastas
        -- Id (PK) --> s.id
        -- Titulo --> s.name
        -- Descripcion
        -- Precio inicial
        -- Categoria_id (FK de categorias)
        -- Condicion
        -- Imagenes (js)
        -- Subastador (FK de usuarios)
        -- Tipo de oferta (canje, dinero, mixta)
        -- Estado de subasta (Activo, vendido, inactivo)
        -- Ubicacion_id (FK de usuarios)
        -- Ofertas recibidas <-- variable
        -- Fecha de creacion
        -- Fecha de modficacion

    -- Ofertas
        -- id (PK) --> o.id
        -- tipo de oferta (canje, dinero, mixta) <-- (Tabla fija)
        -- Titulo 
        -- Descripcion
        -- Imagenes (js)
        -- Monto
        -- id de vendedor <-- (FK de users)
        -- id de ofertador <-- (FK de users)
        -- id de subasta <-- (FK de subastas)
        -- fecha de creacion
        -- fecha de modificacion

    -- Tipo de oferta
        -- producto
        -- dinero
        -- mixta

    -- categorias
        -- id
        -- nombre
        -- categora_padre (por si es una subcategoria)

## Navbar
    ¿Que contiene?
        lado izquierdo: Logo (boton de inicio) 
        lado derecho:  
            Boton de crear subasta
            Foto del perfil con dropdown que contenga "mi perfil" "mis subastas" "Cerrar sesion"


## Paginas

    -- Inicio
        ¿Que contiene el inicio?
            bienvenida(pagina temporal)
            barra de busqueda
            Dropdown de filtros
            Subastas recientes

    -- Perfil
        ¿Que contiene el perfil?
            Datos de usuario
                nombre completo
                username
                foto de perfil
                correo electronico
                numero de telefono
                ubicacion aproximada
            Mis ofertas
                grilla con tus ofertas
                botón de eliminar 
                imagen
                título
                tipo de oferta
                monto/canje
                categoria
                filtro
    
    -- Mis subastas (dentro de Perfil)
        Grilla con tus subastas (activas e inactivas)
            título
            botón de editar(cambiar estado, precio base)
            botón de eliminar 
            imagen
            tipo de oferta
            precio inicial
            categoria
            filtro

    -- Subasta
        título
        Imagen 
        descripción
        precio inicial (solo en opción dinero o mixto)
        categoria 
        tipo de canje (dinero, objeto y mixto)
        botón ofertar
        botón eliminar 

    -- Crear subasta
        va a contener un formulario
            -título
            -precio inicial
            -categoria
            -dropdown (condición)
            -descripción
            -imagenes
            -dropdown (tipo de canje)
            -botón de crear subasta
    
    -- Inicio de sesion
        formulario
            -correo electronico
            -contraseña
            -botoón de Iniciar Sesión
        botón de "Registrarme"

    -- Registro
        formulario
            -nombre completo
            -username
            -foto de perfil
            -correo electronico
            -numero de telefono
            -ubicacion aproximada 
            -contraseña

        



    