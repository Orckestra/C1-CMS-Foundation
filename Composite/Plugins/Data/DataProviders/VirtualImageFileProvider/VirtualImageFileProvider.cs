using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Plugins.Data.DataProviders.VirtualImageFileProvider
{
    [ConfigurationElementType(typeof(NonConfigurableDataProvider))]
    internal sealed class VirtualImageFileProvider : IDataProvider
	{
        public DataProviderContext Context
        {
            set { ; }
        }

        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return new List<Type> { typeof(IImageFile) };
        }

        public IQueryable<T> GetData<T>() where T : class, IData
        {
            if (typeof(T) != typeof(IImageFile)) throw new InvalidOperationException( "Unsupported data interface" );

            return new VirtualImageFileQueryable<T>(
                from mediaFile in DataFacade.GetData<IMediaFile>()
                where mediaFile.MimeType != null && mediaFile.MimeType.StartsWith("image")
                select new VirtualImageFile(mediaFile) as T);
        }

        public T GetData<T>(IDataId dataId) where T : class, IData
        {
            throw new NotImplementedException("Unexpected call. This provider does not produce its own data source id's");
        }
    }
}
