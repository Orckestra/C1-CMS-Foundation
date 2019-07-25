using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Types
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]  
    [Title("Hostname mapping")]
    [AutoUpdateble]
    [ImmutableTypeId("{2B0B1268-7237-4482-97A3-1BD4CAD6A08C}")]
    [KeyPropertyName("Id")]
    [LabelPropertyName("Hostname")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [Caching(CachingType.Full)]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    public interface IHostnameBinding : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{405A7A25-6E53-4DDF-A6C2-26714D26D1F5}")]
        Guid Id { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255, IsNullable = false)]
        [ImmutableFieldId("{36E7E803-178A-4453-9B5B-BF7148BA077B}")]
        [RegexValidator(@"^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$")]
        [NotNullValidator]
        string Hostname { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = false)]
        [ImmutableFieldId("{A9C79722-D62A-481A-B1DE-CFB37A68EB9A}")]
        [NotNullValidator]
        string Culture { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{2C2AEBF7-2CFC-4B6B-9199-991E4ABD8FFC}")]
        [DefaultFieldGuidValue("{00000000-0000-0000-0000-000000000000}")]
        Guid HomePageId { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 255, IsNullable = true)]
        [ImmutableFieldId("{B0ADBBBF-15C9-4902-B202-BD4A1014725D}")]
        string PageNotFoundUrl { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString, IsNullable = true)]
        [ImmutableFieldId("{80C298F2-F493-465D-9F28-4F50DD0C03D5}")]
        string Aliases { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{3ED674CC-24C2-2DDB-C53D-71421AA03127}")]
        bool IncludeHomePageInUrl { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{A554BD68-C2F5-6F6F-4D3B-1FC2760BDE38}")]
        bool IncludeCultureInUrl { get; set; }

        /// <summary>
        /// When set to <value>true</value>, the system will generate HTTPS links to the hostname and 
        /// will make automatic redirects from HTTP to HTTPS for the given hostname.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [DefaultFieldBoolValue(false)]
        [ImmutableFieldId("{1F45F2E7-2FAF-4F33-ACCA-BFF32EF7818A}")]
        bool EnforceHttps { get; set; }

        /// <summary>
        /// When set to <value>true</value>, the system will use "HTTP 301 Permanent Redirect" when  
        /// redirecting from an alias to the hostname.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [DefaultFieldBoolValue(true)]
        [ImmutableFieldId("{d933184a-19c1-4292-8e2e-f4a1a163f087}")]
        bool UsePermanentRedirect { get; set; }
    }
}
