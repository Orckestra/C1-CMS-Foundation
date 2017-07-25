using System;
using System.Diagnostics;
using Newtonsoft.Json;


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
        public static DataScopeIdentifier Public { get; } = new DataScopeIdentifier(PublicName);

        /// <exclude />
        public static DataScopeIdentifier Administrated { get; } = new DataScopeIdentifier(AdministratedName);

        /// <exclude />
        public static DataScopeIdentifier GetDefault()
        {
            return DataScopeIdentifier.Public;
        }

        [JsonConstructor]
        private DataScopeIdentifier(string name)
        {
            this.Name = name;
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
            Verify.ArgumentNotNull(serializedData, nameof(serializedData));

            switch (serializedData)
            {
                case PublicName:
                    return DataScopeIdentifier.Public;

                case AdministratedName:
                    return DataScopeIdentifier.Administrated;

                default:
                    throw new InvalidOperationException("The serializedData argument was not a serialized DataScope");
            }
        }


        /// <exclude />
        public PublicationScope ToPublicationScope()
        {
            return Name == PublicName ? PublicationScope.Published : PublicationScope.Unpublished;
        }


        /// <exclude />
        public static DataScopeIdentifier FromPublicationScope(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Published ? Public : Administrated;
        }


        /// <exclude />
        public static bool IsLegasyDataScope(string name)
        {
            name = name.ToLowerInvariant();
            return name == "deleted" || name == "versioned";
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            return obj != null && Equals(obj as DataScopeIdentifier);
        }


        /// <exclude />
        public bool Equals(DataScopeIdentifier dataScope)
        {
            return !ReferenceEquals(dataScope, null) && this.Name == dataScope.Name;
        }

        /// <exclude />
        public static bool operator==(DataScopeIdentifier a, DataScopeIdentifier b)
        {
            return (object)a == null ? (object)b == null : a.Equals(b);
        }

        /// <exclude />
        public static bool operator!=(DataScopeIdentifier a, DataScopeIdentifier b)
        {
            return !(a == b);
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
