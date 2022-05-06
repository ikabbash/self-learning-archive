var removeDuplicates = function(nums) {
    var k = 0;
    for(i=0; i<nums.length; i++){
        if(nums[i+1]==nums[i]){
            nums.splice(k,1);
            i-=1;
        }
        else{
            k+=1;
        }
    }
    console.log(nums);
}

removeDuplicates([1,1,2,3,3,4,5]);