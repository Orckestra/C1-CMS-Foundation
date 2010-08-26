using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data.Hierarchy;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;

namespace Composite.Data.Types
{
    internal sealed class MediaFileDataAncesorProvider : IDataAncestorProvider
	{

        public IData GetParent(IData data)
        {
            IData parent = null;
            if (data is IMediaFile)
            {
                IMediaFile file = (IMediaFile)data;

                parent = (from item in DataFacade.GetData<IMediaFileFolder>()
                          where item.Path == file.FolderPath && item.StoreId == file.StoreId
                          select item).FirstOrDefault();
 
            }
            else if (data is IMediaFileFolder)
            {
                IMediaFileFolder folder = (IMediaFileFolder)data;

                int lastIndex = folder.Path.LastIndexOf('/');
                if(lastIndex == 0)
                {
                    return null;
                }

                string parentPath = folder.Path.Substring(0, lastIndex);
                parent = (from item in DataFacade.GetData<IMediaFileFolder>()
                          where item.Path == parentPath && item.StoreId == folder.StoreId
                          select item).FirstOrDefault();
            }
            else
            {
                throw new ArgumentException("Must be either of type IMediaFile or IMediaFileFolder", "data");
            }


            return parent;
        }

    }
}
