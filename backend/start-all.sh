gnome-terminal --title="auth-service" --tab -- bash -c "cd ./auth-service; npm start; exec bash"
gnome-terminal --title="user-service" --tab -- bash -c "cd ./user-service; npm start; exec bash"
gnome-terminal --title="expense-service" --tab -- bash -c "cd ./expense-service; npm start; exec bash"
