from websocket_server import WebsocketServer
import json

# Called for every client connecting (after handshake)
def new_client(client, server):
    print("New client connected and was given id %d" % client['id'])
    #server.send_message_to_all("Hey all, a new client has joined us")


# Called for every client disconnecting
def client_left(client, server):
    print("Client(%d) disconnected" % client['id'])


# Called when a client sends a message
def message_received(client, server, message):
    global host_1
    global host_2
    mes = json.loads(message)
    if "host" in mes:
        if mes["host"] == 1:
            host_1 = client
        else:
            host_2 = client
    if "to" in mes:
        if mes["to"] == 1:
            server.send_message(host_1, message)
        else:
            server.send_message(host_2, message)
    if "sync" in mes:
        server.send_message_to_all(message)

    print("Client(%d) said: %s" % (client['id'], message))


PORT=5555
server = WebsocketServer(PORT, "0.0.0.0")
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()
