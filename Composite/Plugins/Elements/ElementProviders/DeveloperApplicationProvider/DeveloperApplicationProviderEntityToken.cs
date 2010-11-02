using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core.Configuration;
using Composite.Core.IO;


namespace Composite.Plugins.Elements.ElementProviders.DeveloperApplicationProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class DeveloperApplicationProviderEntityToken : EntityToken
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
                return System.IO.Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), this.Filename);
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
