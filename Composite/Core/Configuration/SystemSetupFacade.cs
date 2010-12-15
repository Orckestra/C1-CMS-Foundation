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



        /// <summary>
        /// This method is used to record the very first time the system is started.
        /// Ths time can later be used to several things like finding files that have been written to etc.
        /// </summary>
        public static void SetFirstTimeStart()
        {
            if (C1File.Exists(FirstTimeStartFilePath) == false)
            {
                string directory = Path.GetDirectoryName(FirstTimeStartFilePath);
                if (C1Directory.Exists(directory) == false)
                {
                    C1Directory.CreateDirectory(directory);
                }

                XDocument doc = new XDocument(
                    new XElement("Root", new XAttribute("time", DateTime.Now))
                );

                doc.SaveToFile(FirstTimeStartFilePath);
            }
        }



        /// <summary>
        /// Returns the time the system was startet the very first time
        /// </summary>
        /// <returns>The very first time the system has been started</returns>        
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is intended")]
        public static DateTime GetFirstTimeStart()
        {
            if (File.Exists(FirstTimeStartFilePath) == false) throw new InvalidOperationException(FirstTimeStartFilePath + " is missing");

            XDocument doc = XDocumentUtils.Load(FirstTimeStartFilePath);

            return (DateTime)doc.Element("Root").Attribute("time");
        }



        private static string FirstTimeStartFilePath
        {
            get
            {
                return PathUtil.Resolve("~/App_Data/Composite/Configuration/FirstTimeStart.xml");
            }
        }
    }
}
