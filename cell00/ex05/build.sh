if [ $# -eq 0 ]; then
    echo "No Arguement Supplies"
    exit 1
fi

for folder in "$@"
do
    mkdir -p "ex$folder"
    echo "Created folder: ex$folder"
done