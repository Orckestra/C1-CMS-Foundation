using System.Configuration;
using Composite.Core.Implementation;


namespace Composite.Core.Configuration
{
    /// <summary>
    /// This class is a almost one to one version of System.Configuration.Configuration. Using this implementation instead 
    /// of System.Configuration.Configuration, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.Configuration.Configuration for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1Configuration"/>.
    /// </summary>
    public class C1Configuration : ImplementationContainer<C1ConfigurationImplementation>
    {
        /// <summary>
        /// Creates a C1Configuration
        /// </summary>
        /// <param name="path">Path to configuration file.</param>
        public C1Configuration(string path)
            : base(() => ImplementationFactory.CurrentFactory.CreateC1Configuration(path))
        {
        }



        /// <summary>
        /// Gets the path to the configuration file.
        /// </summary>
        public string FilePath
        {
            get
            {
                return this.Implementation.FilePath;
            }
        }



        /// <summary>
        /// Returns true if the configuration file exists.
        /// </summary>
        public bool HasFile
        {
            get
            {
                return this.Implementation.HasFile;
            }
        }



        /// <summary>
        /// Returns the app setttings section.
        /// </summary>
        public AppSettingsSection AppSettings
        {
            get
            {
                return this.Implementation.AppSettings;
            }
        }



        /// <summary>
        /// Returns the connection string section.
        /// </summary>
        public ConnectionStringsSection ConnectionStrings
        {
            get
            {
                return this.Implementation.ConnectionStrings;
            }
        }



        /// <summary>
        /// Returns the configuration sections.
        /// </summary>
        public ConfigurationSectionCollection Sections
        {
            get
            {
                return this.Implementation.Sections;
            }
        }



        /// <summary>
        /// Returns the configuration section group.
        /// </summary>
        public ConfigurationSectionGroup RootSectionGroup
        {
            get
            {
                return this.Implementation.RootSectionGroup;
            }
        }



        /// <summary>
        /// Returns the configuration slection groups.
        /// </summary>
        public ConfigurationSectionGroupCollection SectionGroups
        {
            get
            {
                return this.Implementation.SectionGroups;
            }
        }



        /// <summary>
        /// Gets a named configuration section.
        /// </summary>
        /// <param name="sectionName">Name of section to get.</param>
        /// <returns>Returns the configuration section.</returns>
        public ConfigurationSection GetSection(string sectionName)
        {
            return this.Implementation.GetSection(sectionName);
        }



        /// <summary>
        /// Gets a named configuration section group.
        /// </summary>
        /// <param name="sectionGroupName">Name of configuration section group to get.</param>
        /// <returns>Returns the configuration section group.</returns>
        public ConfigurationSectionGroup GetSectionGroup(string sectionGroupName)
        {
            return this.Implementation.GetSectionGroup(sectionGroupName);
        }



        /// <summary>
        /// Saves the configuration.
        /// </summary>
        public void Save()
        {
            this.Implementation.Save();
        }



        /// <summary>
        /// Saves the configuration.
        /// </summary>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        public void Save(ConfigurationSaveMode saveMode)
        {
            this.Implementation.Save(saveMode);
        }



        /// <summary>
        /// Saves the configuration.
        /// </summary>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        /// <param name="forceSaveAll">Saves all sections, even non touched.</param>
        public void Save(ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            this.Implementation.Save(saveMode, forceSaveAll);
        }



        /// <summary>
        /// Saves the configuration to a new file.
        /// </summary>
        /// <param name="filename">Path to new configuration filename.</param>
        public void SaveAs(string filename)
        {
            this.Implementation.SaveAs(filename);
        }



        /// <summary>
        /// Saves the configuration to a new file.
        /// </summary>
        /// <param name="filename">Path to new configuration filename.</param>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        public void SaveAs(string filename, ConfigurationSaveMode saveMode)
        {
            this.Implementation.SaveAs(filename, saveMode);
        }



        /// <summary>
        /// Saves the configuration to a new file.
        /// </summary>
        /// <param name="filename">Path to new configuration filename.</param>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        /// <param name="forceSaveAll">Saves all sections, even non touched.</param>
        public void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            this.Implementation.SaveAs(filename, saveMode, forceSaveAll);
        }
    }
}
