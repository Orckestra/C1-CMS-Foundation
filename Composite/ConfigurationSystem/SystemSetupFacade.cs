using System;
using System.IO;
using System.Xml.Linq;
using Composite.IO;


namespace Composite.ConfigurationSystem
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
                        _isSystemFirstTimeInitializedValue = File.Exists(FilePath);
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
                    if (File.Exists(FilePath) == false)
                    {
                        XDocument doc = new XDocument(
                            new XElement("Root", new XAttribute("Status", true))
                        );

                        doc.Save(FilePath);
                    }

                    _isSystemFirstTimeInitializedValue = true;
                }
            }
        }



        private static string FilePath
        {
            get
            {
                return PathUtil.Resolve("~/App_Data/Composite/Configuration/SystemInitialized.xml");
            }
        }
    }
}
