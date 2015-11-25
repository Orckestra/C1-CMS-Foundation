using System;
using Composite.Core.Serialization;
using System.Collections.Generic;

namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(PropertySerializerHandler))]
	public sealed class PackageDescription
	{
        /// <exclude />
        public string PackageFileDownloadUrl { get; set; }

        /// <exclude />
        public string PackageVersion { get; set; }

        /// <exclude />
        public string Description { get; set; }

        /// <exclude />
        public Guid EulaId { get; set; }

        /// <exclude />
        public string GroupName { get; set; }

        /// <exclude />
        public Guid Id { get; set; }

        /// <exclude />
        public bool InstallationRequireLicenseFileUpdate { get; set; }

        /// <exclude />
        public bool IsFree { get; set; }

        /// <exclude />
        public bool IsTrial { get; set; }

        /// <exclude />
        public Guid LicenseRuleId { get; set; }

        /// <exclude />
        public string MaxCompositeVersionSupported { get; set; }

        /// <exclude />
        public string MinCompositeVersionSupported { get; set; }

        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public decimal PriceAmmount { get; set; }

        /// <exclude />
        public string PriceCurrency { get; set; }

        /// <exclude />
        public string ReadMoreUrl { get; set; }

        /// <exclude />
        public string TechicalDetails { get; set; }

        /// <exclude />
        public int TrialPeriodDays { get; set; }

        /// <exclude />
        public bool UpgradeAgreementMandatory { get; set; }

        /// <exclude />
        public string Vendor { get; set; }

        /// <exclude />
        public string ConsoleBrowserUrl { get; set; }

        /// <exclude />
        public List<Subscription> AvailableInSubscriptions { get; set; }
    }


    /// <exclude />
    public sealed class Subscription
    {
        /// <exclude />
        public string Name { get; set; }
        /// <exclude />
        public string DetailsUrl { get; set; }
        /// <exclude />
        public bool Purchasable { get; set; }
    }
}
