using System.Runtime.Serialization;

namespace Microsoft.WindowsAzurePack.Samples.HelloWorld.ApiClient.DataContracts
{
    [DataContract(Namespace = Constants.DataContractNamespaces.Default)]
    public class HybridCloudVm
    {
        /// 
        /// displayName
        /// 
        [DataMember(Name="displayName", Order = 0)]
        public string DisplayName { get; set; }

        /// 
        /// InstanceCount
        /// 
        [DataMember(Name = "instanceCount", Order = 1)]
        public string InstanceCount { get; set; }

        /// 
        /// Size
        /// 
        [DataMember(Name = "size", Order = 2)]
        public string Size { get; set; }
    }
}
