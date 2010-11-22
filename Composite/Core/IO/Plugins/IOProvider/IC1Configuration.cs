using System.Configuration;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1Configuration
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string FilePath { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool HasFile { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        AppSettingsSection AppSettings { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ConnectionStringsSection ConnectionStrings { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ConfigurationSectionCollection Sections { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ConfigurationSectionGroup RootSectionGroup { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ConfigurationSectionGroupCollection SectionGroups { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sectionName"></param>
        /// <returns></returns>
        ConfigurationSection GetSection(string sectionName);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sectionGroupName"></param>
        /// <returns></returns>
        ConfigurationSectionGroup GetSectionGroup(string sectionGroupName);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Save();



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="saveMode"></param>
        void Save(ConfigurationSaveMode saveMode);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        void Save(ConfigurationSaveMode saveMode, bool forceSaveAll);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        void SaveAs(string filename);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="saveMode"></param>
        void SaveAs(string filename, ConfigurationSaveMode saveMode);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll);
    }
}
