using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using Composite.Data;
using Composite.Core.Implementation;


namespace Composite
{
    /// <summary>
    /// Define the scope of data in relation to publication status. Data which support publication should always be maintained 
    /// in the “Internal” scope, while reading data on the public website should always be done in the “Public” scope. 
    /// Correct setting of the PublicationScope is typically handled by Composite C1 and should in general not be changed by developers. 
    /// Setting an explicit PublicationScope is typically only needed on new service end-points or 
    /// if specific features relating to data updating / publication is desired.
    /// See <see cref="Storage.Open"/>
    /// </summary>
    public enum PublicationScope
    {
        /// <summary>
        /// Only show data that has been published.
        /// </summary>
        Public,

        /// <summary>
        /// Show / update unpublished data.
        /// </summary>
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
        [SuppressMessage("Microsoft.Globalization", "CA1304:SpecifyCultureInfo", MessageId = "Composite.Core.Implementation.StorageBase.Open")]
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
        [SuppressMessage("Microsoft.Globalization", "CA1304:SpecifyCultureInfo", MessageId = "Composite.Core.Implementation.StorageBase.Open(Composite.PublicationScope)")]
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



        /// <summary>
        /// Create a new <typeparamref name="T"/> that can be added using <see cref="Composite.StorageAccess.Add"/>.
        /// </summary>
        /// <example>
        /// Here is an example of how to create a new IData instance and add it to the C1 storage.
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///    myDataType.Name = "John Doe";
        ///    access.Add&lt;IMyDataType&gt;(myDataType);        
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <returns>Returns a new instance of the <typeparamref name="T"/></returns>
        public static T New<T>() where T : class, IData
        {
            return ImplementationContainer.GetImplementation<StorageBase>().New<T>();
        }



        /// <summary>
        /// All locales added to C1.
        /// </summary>
        /// <example>
        /// Here is an example of how to enumerate all locales added to C1.
        /// <code>
        /// foreach (CultureInfo locale in Storage.Locales)
        /// {
        ///    // Use the locale
        /// }
        /// </code>
        /// </example>
        public static IEnumerable<CultureInfo> Locales
        {
            get
            {
                return ImplementationContainer.GetImplementation<StorageBase>().Locales;
            }
        }



        /// <summary>
        /// Creates a new <see cref="StorageEvents"/> instance that can be used to subscribe/unsubscribe to
        /// storage related events in C1.
        /// </summary>
        /// <example>
        /// Here is a simple example of how to subscribe to a storage event in C1.
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnBeforeAdd += new StorageEventHandler(Storage_OnBeforeAdd);
        /// }
        /// 
        /// 
        /// void Storage_OnBeforeAdd(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <returns>Returns a <see cref="StorageEvents"/> instance.</returns>
        public static StorageEvents Events<T>() where T : class, IData
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events<T>();
        }
    }
}
