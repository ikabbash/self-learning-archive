var maxDepth = function(root) {
    // to make sure if root.left or root.right
    // hits the end, we return 0 to be added with 1
    // after Math.max, example: max(1,0) + 1
    if(root === undefined || root===null){
        return 0;
    }
    level = Math.max(maxDepth(root.left),maxDepth(root.right)) + 1
    console.log(level)
    return level;
};

// NOT MY OWN ORIGINAL SOLUTION