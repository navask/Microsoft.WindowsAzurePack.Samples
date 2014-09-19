using System.Runtime.Serialization;

namespace Microsoft.WindowsAzurePack.Samples.HelloWorld.ApiClient.DataContracts
{
    [DataContract(Namespace = Constants.DataContractNamespaces.Default)]
    public class HybridCloudVm
    {
        /// 
        /// displayName
        /// 
        [DataMember(Order = 0)]
        public string DisplayName { get; set; }

        /// 
        /// InstanceCount
        /// 
        [DataMember(Order = 1)]
        public string InstanceCount { get; set; }

        /// 
        /// Size
        /// 
        [DataMember(Order = 2)]
        public string Size { get; set; }
    }
}
