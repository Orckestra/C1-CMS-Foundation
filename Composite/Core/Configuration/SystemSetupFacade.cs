using System;
using System.IO;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;


namespace Composite.Core.Configuration
{
    /// <summary>
    /// This class may not depended on the system being initialized. 
    /// Any call to the class will never result in the system being initialized
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SystemSetupFacade
    {
        private static object _lock = new object();
        private static bool _isSystemFirstTimeInitializedInitialized = false;
        private static bool _isSystemFirstTimeInitializedValue = false;

        static SystemSetupFacade()
        {            
        }


        public static bool IsSystemFirstTimeInitialized
        {
            get
            {
                if (_isSystemFirstTimeInitializedInitialized == false)
                {
                    try
                    {
                        _isSystemFirstTimeInitializedValue = C1File.Exists(SystemInitializedFilePath);
                    }
                    catch (Exception)
                    {
                    }

                    _isSystemFirstTimeInitializedInitialized = true;
                }

                return _isSystemFirstTimeInitializedValue;
            }
            set
            {
                lock (_lock)
                {
                    if (C1File.Exists(SystemInitializedFilePath) == false)
                    {
                        string directory = Path.GetDirectoryName(SystemInitializedFilePath);
                        if (C1Directory.Exists(directory) == false)
                        {
                            C1Directory.CreateDirectory(directory);
                        }

                        XDocument doc = new XDocument(
                            new XElement("Root", new XAttribute("Status", true))
                        );

                        doc.SaveToFile(SystemInitializedFilePath);
                    }

                    _isSystemFirstTimeInitializedValue = true;
                }
            }
        }



        private static string SystemInitializedFilePath
        {
            get
            {
                return PathUtil.Resolve("~/App_Data/Composite/Configuration/SystemInitialized.xml");
            }
        }
    }
}
