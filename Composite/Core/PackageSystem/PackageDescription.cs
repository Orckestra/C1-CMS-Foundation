using System;
using Composite.Core.Serialization;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(PropertySerializerHandler))]
	public sealed class PackageDescription
	{
        public string PackageFileDownloadUrl { get; set; }
        public string PackageVersion { get; set; }
        public string Description { get; set; }
        public Guid EulaId { get; set; }
        public string GroupName { get; set; }
        public Guid Id { get; set; }
        public bool InstallationRequireLicenseFileUpdate { get; set; }
        public bool IsFree { get; set; }
        public bool IsTrial { get; set; }
        public Guid LicenseRuleId { get; set; }
        public string MaxCompositeVersionSupported { get; set; }
        public string MinCompositeVersionSupported { get; set; }
        public string Name { get; set; }
        public decimal PriceAmmount { get; set; }
        public string PriceCurrency { get; set; }
        public string ReadMoreUrl { get; set; }        
        public string TechicalDetails { get; set; }
        public int TrialPeriodDays { get; set; }
        public bool UpgradeAgreementMandatory { get; set; }
        public string Vendor { get; set; }
    }
}
