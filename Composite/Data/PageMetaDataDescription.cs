using System;
using System.Collections.Generic;
using System.Text;
using Composite.Core.Serialization;


namespace Composite.Data
{
    internal sealed class PageMetaDataDescriptionSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            PageMetaDataDescription dataAssociationVisabilityRule = (PageMetaDataDescription)objectToSerialize;

            return dataAssociationVisabilityRule.Serialize();
        }

        public object Deserialize(string serializedObject)
        {
            return PageMetaDataDescription.Deserialize(serializedObject);
        }
    }



    /// <summary>
    /// This class is used when adding a new page metadata type to a given page. In other words, in workflow only.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(PageMetaDataDescriptionSerializerHandler))]
    public sealed class PageMetaDataDescription
    {
        public static PageMetaDataDescription OneToOne() { return new PageMetaDataDescription(PageMetaDataDescriptionType.OneToOne); }
        public static PageMetaDataDescription Branch() { return new PageMetaDataDescription(PageMetaDataDescriptionType.Branch, 0, 100000); }
        public static PageMetaDataDescription Branch(int startLevel) { return new PageMetaDataDescription(PageMetaDataDescriptionType.Branch, startLevel, int.MaxValue); }
        public static PageMetaDataDescription Branch(int startLevel, int levels) { return new PageMetaDataDescription(PageMetaDataDescriptionType.Branch, startLevel, levels); }



        internal PageMetaDataDescription(PageMetaDataDescriptionType dataAssociationVisabilityRuleType)
            : this(dataAssociationVisabilityRuleType, 0, 0)
        {
        }
        
       

        internal PageMetaDataDescription(PageMetaDataDescriptionType dataAssociationVisabilityRuleType, int startLevel, int levels)
        {
            this.PageMetaDataDescriptionType = dataAssociationVisabilityRuleType;
            this.StartLevel = startLevel;
            this.Levels = levels;            
        }        


        public PageMetaDataDescriptionType PageMetaDataDescriptionType
        {
            get;
            private set;
        }


        public int StartLevel
        {
            get;
            private set;
        }


        public int Levels
        {
            get;
            private set;
        }
      


        public string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(sb, "_PageMetaDataDescriptionType_", this.PageMetaDataDescriptionType.ToString());
            StringConversionServices.SerializeKeyValuePair(sb, "_StartLevel_", this.StartLevel.ToString());
            StringConversionServices.SerializeKeyValuePair(sb, "_Levels_", this.Levels.ToString());           

            return sb.ToString();
        }



        internal static PageMetaDataDescription Deserialize(string serializedData)
        {
            // DataAssociationVisabilityRuleType is here for backwards compatibility - after 1.3 its not used any more
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);
            if (((dic.ContainsKey("DataAssociationVisabilityRuleType") == false) && (dic.ContainsKey("_PageMetaDataDescriptionType_") == false)) ||
                (dic.ContainsKey("_StartLevel_") == false) ||
                (dic.ContainsKey("_Levels_") == false))
            {
                throw new ArgumentException(string.Format("The serializedData is not a serialized '{0}'", typeof(PageMetaDataDescription)), "serializedData");
            }

            string serializedDataAssociationVisabilityRuleType;
            if (dic.ContainsKey("_PageMetaDataDescriptionType_") == true)
            {
                serializedDataAssociationVisabilityRuleType = StringConversionServices.DeserializeValueString(dic["_PageMetaDataDescriptionType_"]);
            }
            else
            {
                serializedDataAssociationVisabilityRuleType = StringConversionServices.DeserializeValueString(dic["DataAssociationVisabilityRuleType"]);
            }

            PageMetaDataDescriptionType type = (PageMetaDataDescriptionType)Enum.Parse(typeof(PageMetaDataDescriptionType), serializedDataAssociationVisabilityRuleType);            

            string serializedStartLevel = StringConversionServices.DeserializeValueString(dic["_StartLevel_"]);
            string serializedLevels = StringConversionServices.DeserializeValueString(dic["_Levels_"]);
            
            int startLevel = int.Parse(serializedStartLevel);
            int levels = int.Parse(serializedLevels);

            return new PageMetaDataDescription(type, startLevel, levels);
        }



        public override bool Equals(object obj)
        {
            return Equals(obj as PageMetaDataDescription);
        }



        public bool Equals(PageMetaDataDescription dataAssociationVisabilityRule)
        {
            if (dataAssociationVisabilityRule == null) return false;

            return
                this.PageMetaDataDescriptionType == dataAssociationVisabilityRule.PageMetaDataDescriptionType &&
                this.StartLevel == dataAssociationVisabilityRule.StartLevel &&
                this.Levels == dataAssociationVisabilityRule.Levels;
        }



        public override int GetHashCode()
        {
            return
                this.PageMetaDataDescriptionType.GetHashCode() ^
                this.StartLevel.GetHashCode() ^
                this.Levels.GetHashCode();
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum PageMetaDataDescriptionType
    {
        OneToOne = 0,
        Branch = 1,
        PageType = 2
    }
}
