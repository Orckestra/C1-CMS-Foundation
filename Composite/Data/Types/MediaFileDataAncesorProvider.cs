using System;
using System.Linq;
using Composite.Data.Hierarchy;
using Composite.Core.Extensions;

namespace Composite.Data.Types
{
    internal sealed class MediaFileDataAncesorProvider : IDataAncestorProvider
	{
        public IData GetParent(IData data)
        {
            string parentFolderPath;
            string storeId;

            if (data is IMediaFile)
            {
                var file = (IMediaFile)data;

                parentFolderPath = file.FolderPath;
                storeId = file.StoreId;
            }
            else if (data is IMediaFileFolder)
            {
                var folder = (IMediaFileFolder) data;

                int lastIndex = folder.Path.LastIndexOf('/');
                if (lastIndex == 0)
                {
                    return null;
                }

                parentFolderPath = folder.Path.Substring(0, lastIndex);
                storeId = folder.StoreId;
            }
            else
            {
                throw new ArgumentException("Must be either of type IMediaFile or IMediaFileFolder", nameof(data));
            }

            var queryable = DataFacade.GetData<IMediaFileFolder>();

            return queryable.IsEnumerableQuery()
                ? queryable.AsEnumerable()
                           .FirstOrDefault(item => item.Path == parentFolderPath && item.StoreId == storeId)
                : queryable.FirstOrDefault(item => item.Path == parentFolderPath && item.StoreId == storeId);
        }
    }
}
