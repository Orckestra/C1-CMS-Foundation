using System;
using System.Collections.Generic;
using System.Linq;


namespace Composite.Data
{
    /// <summary>
    /// This facade is used for handlign genereted/dynamic global data types
    /// </summary>
    public static class GlobalDataTypeFacade
    {
        public static IEnumerable<Type> GetAllGlobalDataTypes()
        {
            return
                DataFacade.GetGeneratedInterfaces().
                Except(PageFolderFacade.GetAllFolderTypes()).
                Except(PageMetaDataFacade.GetAllMetaDataTypes());
        }
    }
}
