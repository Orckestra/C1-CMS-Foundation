using System;
using System.Diagnostics;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Name = {Name}")]
    public sealed class DataScopeIdentifier
    {
        /// <exclude />
        public const string PublicName = "public";

        /// <exclude />
        public const string AdministratedName = "administrated";

        /// <exclude />
        [Obsolete("To be removed", false)]
        public const string VersionedName = "versioned";


        /// <exclude />
        public static DataScopeIdentifier Public { get { return new DataScopeIdentifier(PublicName); } }

        /// <exclude />
        public static DataScopeIdentifier Administrated { get { return new DataScopeIdentifier(AdministratedName); } }

        /// <exclude />
        [Obsolete("To be removed", false)]
        public static DataScopeIdentifier Versioned { get { return new DataScopeIdentifier(VersionedName); } }


        /// <exclude />
        public static DataScopeIdentifier GetDefault()
        {
            return DataScopeIdentifier.Public;
        }


        private DataScopeIdentifier(string dataScope)
        {
            this.Name = dataScope;
        }


        /// <exclude />
        public string Name
        {
            get;
            private set;
        }


        /// <exclude />
        public string Serialize()
        {
            return this.Name;
        }


        /// <exclude />
        public static DataScopeIdentifier Deserialize(string serializedData)
        {
            if (serializedData == null) throw new ArgumentNullException("serializedData");

            switch (serializedData)
            {
                case "public":
                    return DataScopeIdentifier.Public;

                case "administrated":
                    return DataScopeIdentifier.Administrated;

                default:
                    throw new InvalidOperationException("The serializedData argument was not a serialized DataScope");
            }
        }


        /// <exclude />
        public PublicationScope ToPublicationScope()
        {
            return Name == "public" ? PublicationScope.Published : PublicationScope.Unpublished;
        }


        /// <exclude />
        public static DataScopeIdentifier FromPublicationScope(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Published ? Public : Administrated;
        }


        /// <exclude />
        public static bool IsLegasyDataScope(string name)
        {
            name = name.ToLower();
            return name == "deleted" || name == "versioned";
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            if (obj == null) return false;

            return Equals(obj as DataScopeIdentifier);
        }


        /// <exclude />
        public bool Equals(DataScopeIdentifier dataScope)
        {
            if (dataScope == null) return false;

            return this.Name == dataScope.Name;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return this.Name.GetHashCode();
        }


        /// <exclude />
        public override string ToString()
        {
            return this.Serialize();
        }       
    }
}
