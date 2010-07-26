using Composite.Security;
using Composite.Security.SecurityAncestorProviders;
using System.IO;
using Composite.IO;
using Composite.GlobalSettings;


namespace Composite.StandardPlugins.Elements.ElementProviders.DeveloperApplicationProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class DeveloperApplicationProviderEntityToken : EntityToken
    {        
        private string _id;
        private string _source;
        

        public const string TreeRootFolderId = "TreeFolder";
        public const string TreeDefinitionId = "TreeDefinition";


        public DeveloperApplicationProviderEntityToken(string id)
            :this(id, "")
        {                        
        }


        public DeveloperApplicationProviderEntityToken(string id, string source)
        {
            _id = id;
            _source = source;
        }


        public override string Type
        {
            get { return ""; }
        }




        public override string Source
        {
            get { return _source; }
        }




        public override string Id
        {
            get { return _id; }
        }




        public string Filename
        {
            get { return this.Source; }
        }



        public string FullTreePath
        {
            get
            {                
                return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), this.Filename);
            }
        }


        public override string Serialize()
        {
            return DoSerialize();
        }



        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            
            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new DeveloperApplicationProviderEntityToken(id, source);
        }
    }
}
