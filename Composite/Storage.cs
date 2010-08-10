using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;
using Composite.Implementation;
using System.Diagnostics.CodeAnalysis;


namespace Composite
{
    public enum PublicationScope
    {
        Public,
        Internal
    }
    


    /// <summary>
    /// This class provies the main access to the C1 storage. This could be based on SQL, XML or some other kind of storage.
    /// </summary>
    public static class Storage
    {        
        static Storage()
        {
            ImplementationContainer.SetImplementation<StorageBase>(new StorageDefaultImplementation());
        }



        /// <summary>
        /// Creates a new <see cref="StorageAccess"/> instance that can be used to access the C1 storage.
        /// </summary>
        /// <example>
        /// Here is an example of how to use <see cref="Storage.Open" /> and its return value
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    var q = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <returns>A <see cref="StorageAccess"/> instance with the default locale and <see cref="PublicationScope"/></returns>
        [SuppressMessage("Microsoft.Globalization", "CA1304:SpecifyCultureInfo", MessageId = "Composite.Implementation.StorageBase.Open")]
        public static StorageAccess Open()
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open();
        }




        /// <summary>
        /// Creates a new <see cref="StorageAccess"/> instance that can be used to access the C1 storage.
        /// </summary>
        /// <example>
        /// Here is an example of how to use <see cref="Storage.Open" /> and its return value
        /// In this example the data items returned by the <see cref="StorageAccess"/> is from the
        /// internal scope.
        /// <code>
        /// using (StorageAccess access = Storage.Open(PublicationScope.Internal))
        /// {
        ///    var q = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <param name="publicationScope">The desired <see cref="PublicationScope"/></param>
        /// <returns>A <see cref="StorageAccess"/> instance with the default locale and the given <paramref name="publicationScope"/></returns>
        [SuppressMessage("Microsoft.Globalization", "CA1304:SpecifyCultureInfo", MessageId = "Composite.Implementation.StorageBase.Open(Composite.PublicationScope)")]
        public static StorageAccess Open(PublicationScope publicationScope)
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(publicationScope);
        }



        /// <summary>
        /// Creates a new <see cref="StorageAccess"/> instance that can be used to access the C1 storage.
        /// </summary>        
        /// <example>
        /// Here is an example of how to use <see cref="Storage.Open" /> and its return value
        /// In this example the data items returned by the <see cref="StorageAccess"/> is from the
        /// internal scope and the danish locale
        /// <code>
        /// using (StorageAccess access = Storage.Open(PublicationScope.Internal, new CultureInfo("da-DK")))
        /// {
        ///    var q = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <param name="publicationScope">The desired <see cref="PublicationScope"/></param>
        /// <param name="locale">The desired locale</param>
        /// <returns>A <see cref="StorageAccess"/> instance with the given <paramref name="locale"/> and <paramref name="publicationScope"/></returns>
        public static StorageAccess Open(PublicationScope publicationScope, CultureInfo locale)
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(publicationScope, locale);
        }




        /// <summary>
        /// Creates a new <see cref="StorageAccess"/> instance that can be used to access the C1 storage.
        /// </summary>
        /// <example>
        /// Here is an example of how to use <see cref="Storage.Open" /> and its return value
        /// In this example the data items returned by the <see cref="StorageAccess"/> is from danish locale
        /// <code>
        /// using (StorageAccess access = Storage.Open(new CultureInfo("da-DK")))
        /// {
        ///    var q = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <param name="locale">The desired locale</param>
        /// <returns>A <see cref="StorageAccess"/> instance with the default <see cref="PublicationScope"/> and the given <paramref name="locale"/></returns>
        public static StorageAccess Open(CultureInfo locale)
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(locale);
        }


        
        public static T New<T>() where T : class, IData
        {
            return ImplementationContainer.GetImplementation<StorageBase>().New<T>();
        }



        public static IEnumerable<CultureInfo> Locales
        {
            get
            {
                return ImplementationContainer.GetImplementation<StorageBase>().Locales;
            }
        }



        public static StorageEvents Events<T>() where T : class, IData
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events<T>();
        }



        public static StorageEvents Events(Type interfaceType)
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events(interfaceType);
        }
    }
}
