using System;
using System.Configuration;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.C1Console.Events;
using Composite.Core.IO;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.IO;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class ConfigurationServices
    {
        private static IConfigurationSource _configurationSource = null;
        private static string _fileConfigurationSourcePath;

        private static readonly object _lock = new object();


        /// <exclude />
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "The configuration is needed to boot the IO layer, so we cant use it here")]
        static ConfigurationServices()
        {
            if (RuntimeInformation.IsUnittest)
            {
                _configurationSource = ConfigurationSourceFactory.Create();
                return;
            }

            _fileConfigurationSourcePath = GetFileConfigurationSourcePath();

            Verify.IsNotNull(_fileConfigurationSourcePath, "Configuration file is not defined");

            FileAttributes fileAttributes = File.GetAttributes(_fileConfigurationSourcePath);
            if ((fileAttributes & FileAttributes.ReadOnly) == FileAttributes.ReadOnly)
            {
                fileAttributes ^= FileAttributes.ReadOnly;
                File.SetAttributes(_fileConfigurationSourcePath, fileAttributes);
            }

            _configurationSource = new FileConfigurationSource(_fileConfigurationSourcePath);
        }


        /// <exclude />
        public static IConfigurationSource ConfigurationSource
        {
            get
            {
                return _configurationSource;
            }
            set
            {
                // Unit test code only!
                // if (RuntimeInformation.IsUnittest == false) throw new InvalidOperationException("Intented for unit testing only");

                lock (_lock)
                {
                    _configurationSource = value;
                    string fileConfigurationSourcePath = null;

                    if (_configurationSource != null)
                    {
                        fileConfigurationSourcePath = GetFileConfigurationSourcePath();
                    }

                    if (fileConfigurationSourcePath != null)
                    {
                        FileUtils.RemoveReadOnly(fileConfigurationSourcePath);
                    }

                    // GlobalEventSystemFacade.FlushTheSystem();

                    _fileConfigurationSourcePath = fileConfigurationSourcePath;
                }
            }
        }



        internal static string FileConfigurationSourcePath
        {
            get
            {
                if ((_configurationSource != null) && (_fileConfigurationSourcePath == null))
                {
                    throw new InvalidOperationException("Unable to locate the ConfigurationSourceSection");
                }
                return _fileConfigurationSourcePath;
            }
            set
            {
                if (Composite.RuntimeInformation.IsUnittest == false) throw new InvalidOperationException("FileConfigurationSourcePath set is for unit testing only.");

                _fileConfigurationSourcePath = value;
            }
        }


        /// <exclude />
        public static void SaveConfigurationSection(string sectionName, ConfigurationSection configurationSection)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                lock (_lock)
                {
                    string tempFilePath = ConfigurationServices.TempRandomConfigFilePath;
                    C1File.Copy(FileConfigurationSourcePath, tempFilePath);
                    FileConfigurationParameter configurationParameter = new FileConfigurationParameter(tempFilePath);
                    ConfigurationServices.ConfigurationSource.Add(configurationParameter, sectionName, configurationSection);
                    // Kill monitoring of file changes:
                    //                    FileConfigurationSource.ResetImplementation(ConfigurationServices.FileConfigurationSourcePath, false);
                    C1File.Copy(tempFilePath, ConfigurationServices.FileConfigurationSourcePath, true);
                    DeleteTempConfigurationFile(tempFilePath);

                    _configurationSource = new FileConfigurationSource(ConfigurationServices.FileConfigurationSourcePath);
                    // Kill monitoring of file changes:
                    //                    FileConfigurationSource.ResetImplementation(ConfigurationServices.FileConfigurationSourcePath, false);
                }
            }
        }


        /// <summary>
        /// Transforms the current configuration file based on the supplied XSLT document. The resulting 
        /// configuration document is validated and no errors are tollerated. Configurationerrors are handled
        /// as exceptions.
        /// </summary>
        /// <param name="xsltDocument">XSLT document to apply to the configuration document</param>
        /// <param name="simulationOnly">When true the configuration transformation will only be validated, not executed. When false, the configuration change will be persisted.</param>
        public static void TransformConfiguration(XDocument xsltDocument, bool simulationOnly)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                lock (_lock)
                {
                    XslCompiledTransform transformer = new XslCompiledTransform();
                    XDocument resultDocument = new XDocument();

                    using (XmlReader reader = xsltDocument.CreateReader())
                    {
                        transformer.Load(reader);
                    }

                    using (XmlWriter writer = resultDocument.CreateWriter())
                    {
                        transformer.Transform(ConfigurationServices.FileConfigurationSourcePath, writer);
                    }

                    ValidateConfigurationFile(resultDocument);

                    if (simulationOnly == false)
                    {
                        // Kill monitoring of file changes:
                        //                        FileConfigurationSource.ResetImplementation(ConfigurationServices.FileConfigurationSourcePath, false);
                        resultDocument.SaveToFile(ConfigurationServices.FileConfigurationSourcePath);
                        _configurationSource = new FileConfigurationSource(ConfigurationServices.FileConfigurationSourcePath);
                        // Kill monitoring of file changes:
                        //                        FileConfigurationSource.ResetImplementation(ConfigurationServices.FileConfigurationSourcePath, false);
                    }
                }
            }
        }



        /// <exclude />
        public static void TransformConfiguration(Func<XDocument, bool> transformer)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                lock (_lock)
                {
                    XDocument document = XDocumentUtils.Load(ConfigurationServices.FileConfigurationSourcePath);

                    if (transformer(document) == true)
                    {
                        ValidateConfigurationFile(document);

                        // Kill monitoring of file changes:
                        //                        FileConfigurationSource.ResetImplementation(ConfigurationServices.FileConfigurationSourcePath, false);
                        document.SaveToFile(ConfigurationServices.FileConfigurationSourcePath);
                        _configurationSource = new FileConfigurationSource(ConfigurationServices.FileConfigurationSourcePath);
                        // Kill monitoring of file changes:
                        //                        FileConfigurationSource.ResetImplementation(ConfigurationServices.FileConfigurationSourcePath, false);

                        GlobalEventSystemFacade.ShutDownTheSystem();
                    }
                }
            }
        }



        private static void ValidateConfigurationFile(XDocument resultDocument)
        {
            string tempValidationFilePath = TempRandomConfigFilePath;

            resultDocument.SaveToFile(tempValidationFilePath);

            try
            {
                IConfigurationSource testConfigSource = new FileConfigurationSource(tempValidationFilePath);

                foreach (XElement sectionElement in resultDocument.Root.Element("configSections").Elements())
                {
                    if (sectionElement.Attribute("name") != null)
                    {
                        string sectionName = sectionElement.Attribute("name").Value;

                        try
                        {
                            testConfigSource.GetSection(sectionName);
                        }
                        catch (ConfigurationErrorsException exception)
                        {
                            if(exception.InnerException != null &&
                               exception.InnerException is AppCodeTypeNotFoundConfigurationException)
                            {
                                // App_Code classes aren't compiled during package installation, therefore related exceptions are ignored
                            }
                            else
                            {
                                throw;
                            }
                        }
                    }
                }

                DeleteTempConfigurationFile(tempValidationFilePath);
            }
            catch (Exception)
            {
                DeleteTempConfigurationFile(tempValidationFilePath);

                throw;
            }
        }


        private static string TempRandomConfigFilePath
        {
            get
            {
                return string.Format("{0}.test.{1}.xml", ConfigurationServices.FileConfigurationSourcePath, Guid.NewGuid());
            }
        }


        private static void DeleteTempConfigurationFile(string tempValidationFilePath)
        {
            try
            {
                //                FileConfigurationSource.ResetImplementation(tempValidationFilePath, false); //turn file monitoring off
                C1File.Delete(tempValidationFilePath);
            }
            catch (Exception) { }
        }



        private static string GetFileConfigurationSourcePath()
        {
            // Not using the web.config in order not to make solution depend on specific version of Microsoft Enterprice Library

            return PathUtil.Resolve("~/App_Data/Composite/Composite.config");
            

            //lock (_lock)
            //{
            //    ConfigurationSourceSection configurationSourceSection = GetActiveConfigurationSourceSection();

            //    if (configurationSourceSection != null)
            //    {
            //        string systemSourceName = configurationSourceSection.SelectedSource;
            //        ConfigurationSourceElement objectConfiguration = configurationSourceSection.Sources.Get(systemSourceName);

            //        if (objectConfiguration != null)
            //        {
            //            FileConfigurationSourceElement fileConfigurationInfo = objectConfiguration as FileConfigurationSourceElement;
            //            if (fileConfigurationInfo == null) throw new InvalidOperationException("Expected EntLib configuration source configuration to be of type " + typeof(FileConfigurationSourceElement).Name);
            //            string relativePath = fileConfigurationInfo.FilePath;
            //            string tildePath = (Path.IsPathRooted(relativePath) == true ? "~" + relativePath : "~/" + relativePath);

            //            return PathUtil.Resolve(tildePath);
            //        }
            //    }

            //    return null;
            //}
        }



        //private static ConfigurationSourceSection GetActiveConfigurationSourceSection()
        //{
        //    ConfigurationSourceSection configurationSourceSection = ConfigurationSourceSection.GetConfigurationSourceSection();

        //    if (configurationSourceSection == null && ConfigurationSource != null)
        //    {
        //        configurationSourceSection = (ConfigurationSourceSection)ConfigurationSource.GetSection(ConfigurationSourceSection.SectionName);
        //    }

        //    return configurationSourceSection;
        //}
    }
}
