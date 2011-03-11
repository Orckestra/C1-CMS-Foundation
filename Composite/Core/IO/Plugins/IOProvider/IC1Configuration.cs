using System.Configuration;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.Configuration.C1Configuration"/>.
    /// See <see cref="Composite.Core.Configuration.C1Configuration"/> for more information.
    public interface IC1Configuration
    {
        /// <summary>
        /// Gets the path to the configuration file.
        /// </summary>
        string FilePath { get; }



        /// <summary>
        /// Returns true if the configuration file exists.
        /// </summary>
        bool HasFile { get; }



        /// <summary>
        /// Returns the app setttings section.
        /// </summary>
        AppSettingsSection AppSettings { get; }



        /// <summary>
        /// Returns the connection string section.
        /// </summary>
        ConnectionStringsSection ConnectionStrings { get; }



        /// <summary>
        /// Returns the configuration sections.
        /// </summary>
        ConfigurationSectionCollection Sections { get; }



        /// <summary>
        /// Returns the configuration section group.
        /// </summary>
        ConfigurationSectionGroup RootSectionGroup { get; }



        /// <summary>
        /// Returns the configuration slection groups.
        /// </summary>
        ConfigurationSectionGroupCollection SectionGroups { get; }



        /// <summary>
        /// Gets a named configuration section.
        /// </summary>
        /// <param name="sectionName">Name of section to get.</param>
        /// <returns>Returns the configuration section.</returns>
        ConfigurationSection GetSection(string sectionName);



        /// <summary>
        /// Gets a named configuration section group.
        /// </summary>
        /// <param name="sectionGroupName">Name of configuration section group to get.</param>
        /// <returns>Returns the configuration section group.</returns>
        ConfigurationSectionGroup GetSectionGroup(string sectionGroupName);



        /// <summary>
        /// Saves the configuration.
        /// </summary>
        void Save();



        /// <summary>
        /// Saves the configuration.
        /// </summary>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        void Save(ConfigurationSaveMode saveMode);



        /// <summary>
        /// Saves the configuration.
        /// </summary>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        /// <param name="forceSaveAll">Saves all sections, even non touched.</param>
        void Save(ConfigurationSaveMode saveMode, bool forceSaveAll);



        /// <summary>
        /// Saves the configuration to a new file.
        /// </summary>
        /// <param name="filename">Path to new configuration filename.</param>
        void SaveAs(string filename);



        /// <summary>
        /// Saves the configuration to a new file.
        /// </summary>
        /// <param name="filename">Path to new configuration filename.</param>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        void SaveAs(string filename, ConfigurationSaveMode saveMode);



        /// <summary>
        /// Saves the configuration to a new file.
        /// </summary>
        /// <param name="filename">Path to new configuration filename.</param>
        /// <param name="saveMode">Save mode to use when saving the configuration.</param>
        /// <param name="forceSaveAll">Saves all sections, even non touched.</param>
        void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll);
    }
}
